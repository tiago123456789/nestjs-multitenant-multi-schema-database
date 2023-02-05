
const post = (path, data) => {
    return fetch(`${process.env.REACT_APP_API_URL}${path}`, { 
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json())
}

const get = (path, accessToken) => {
    return fetch(`${process.env.REACT_APP_API_URL}${path}`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(response => response.json())
}

export {
    get, post
}