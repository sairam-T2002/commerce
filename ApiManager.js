import { UserDataHelper } from './LocalStorage';

const baseUrl = 'http://localhost:5000/';

const getUserCredentials = async () => {
    return await UserDataHelper.getUserData("user_info_cred") || null;
};

const fetchApiGET = async (endpoint, params) => {
    const usr = await getUserCredentials();
    if (!usr) {
        console.error("USER_NOT_LOGGED_IN");
        return "USER_NOT_LOGGED_IN";
    }

    const url = new URL(endpoint, baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usr.accessToken}`
            }
        });

        if (response.status === 401) {
            const dataR = await ApprefreshToken(usr.accessToken, usr.refreshToken, () => fetchApiGET(endpoint, params));
            return await dataR.json();
        }

        if (!response.ok) {
            console.error('Network response was not ok', response);
            return response;
        }

        const data = await response.json();
        console.log(data, 'response from server');
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow error to be handled by caller
    }
};

const fetchApiPOST = async (endpoint, body, isLogin = false) => {
    const usr = await getUserCredentials();
    console.log(usr);
    if (!usr && !isLogin) {
        console.error("USER_NOT_LOGGED_IN");
        return "USER_NOT_LOGGED_IN";
    }

    const url = new URL(endpoint, baseUrl);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usr?.accessToken || ''}`
            },
            body: JSON.stringify(body)
        });

        if (response.status === 401) {
            const dataR = await ApprefreshToken(usr.accessToken, usr.refreshToken, () => fetchApiPOST(endpoint, body));
            return await dataR.json();
        }

        if (!response.ok) {
            console.error('Network response was not ok', response);
            return response;
        }

        const data = await response.json();
        console.log(data, 'response from server');
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow error to be handled by caller
    }
};

const ApprefreshToken = async (AccessToken, RefreshToken, callback) => {
    try {
        const response = await fetchApiPOST('api/Auth/Refresh', { AccessToken, RefreshToken });

        if (!response.ok) {
            console.error('Network response was not ok', response);
            return response;
        }

        const data = await response.json();
        const usr = await getUserCredentials();
        if (usr) {
            await UserDataHelper.storeUserData("user_info_cred", { ...usr, accessToken: data.AccessToken, refreshToken: data.RefreshToken });
            return await callback(); // Retry the original request
        } else {
            throw new Error('User credentials could not be retrieved');
        }
    } catch (exception) {
        console.error('There was a problem with Refresh:', exception);
        throw exception; // Rethrow exception to be handled by caller
    }
};


export { fetchApiGET, fetchApiPOST };