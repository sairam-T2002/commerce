import { UserDataHelper } from './LocalStorage';

const baseUrl = 'http://10.0.5.38:5085/';

const getUserCredentials = async () => {
    const usr = await UserDataHelper.getUserData("user_info_cred") || null;
    console.log(usr, 'user credentials');
    return usr;
};

const fetchApiGET = async (endpoint, params) => {
    const usr = await getUserCredentials();
    if (!usr) {
        console.error("USER_NOT_LOGGED_IN");
        return "USER_NOT_LOGGED_IN";
    }

    const url = new URL(endpoint, baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    console.log(url, 'GET method url');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usr.accessToken}`
            }
        });

        if (response.status === 401) {
            const dataR = await appRefreshToken(usr.accessToken, usr.refreshToken, () => fetchApiGET(endpoint, params));
            return dataR;
        }

        if (!response.ok) {
            console.error('Network response was not ok', response);
            return response;
        }

        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow error to be handled by caller
    }
};

const fetchApiPOST = async (endpoint, body, isLogin = false) => {
    const usr = await getUserCredentials();
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
            const dataR = await appRefreshToken(usr.accessToken, usr.refreshToken, () => fetchApiPOST(endpoint, body, isLogin));
            return dataR;
        }

        if (!response.ok) {
            console.error('Network response was not ok', response);
            return response;
        }

        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow error to be handled by caller
    }
};

const appRefreshToken = async (AccessToken, RefreshToken, callback) => {
    try {
        console.log(AccessToken, RefreshToken, '       tokens');
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