const baseURL = "/courses";



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
const getAll = () => {
    const errorMessage = 'Errore durante il download dei dati';
    return makeReq(baseURL, errorMessage);
};
