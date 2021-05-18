const getRequest = (url) => {

    return handleResponse(
        fetch(url,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${sessionStorage.getItem('token')}`
                },
            }));
}

const postRequest = (url, data) => {

    return handleResponse(
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }));
}

const putRequest = (url, data) => {

    return handleResponse(
        fetch(url,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }));
}

const deleteRequest = (url, data) => {

    return handleResponse(
        fetch(url,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            }));
}

const handleResponse = (promise) => {

    return promise.then(response => {

        if (!response.ok) {

            if (response.status === 401) {

                router.push("/Login").catch(() => { });

                return { success: false };
            }

            return Promise.reject(response.statusText);
        }

        return response.json();
    });
}

export const requestUtil = {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
}

export default requestUtil;