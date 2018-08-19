const baseURL = "/allcourses.json";


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


const redirect = (course) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(course)
    };

    const errorMessage = 'Errore nel collegamento col server';

    return makeReq(baseURL, errorMessage, options);
};