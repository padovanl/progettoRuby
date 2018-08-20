

function makeReq(url, errorMessage = '', options = {}) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(errorMessage);
            }
        });
}

React.export
const getAll = (page) => {
    const errorMessage = 'Errore durante il download dei dati';
    if (page===1){
        baseURL = "/allcourses.json";
    }
    else
        baseURL = baseURL = "/allcourses.json?page="+page;
    return makeReq(baseURL, errorMessage);
};
