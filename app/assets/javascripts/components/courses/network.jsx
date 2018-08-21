

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

const getAll = (page) => {
    const errorMessage = 'Errore durante il download dei dati';
    if (page===1){
        baseURL = "/allcourses.json";
    }
    else
        baseURL = baseURL = "/allcourses.json?page="+page;
    return makeReq(baseURL, errorMessage);
};


const searchCourses = (course_name) => {
    const errorMessage = 'Errore durante il search dei dati';
    baseURL = "/allcourses.json?search?q="+course_name;
    return makeReq(baseURL, errorMessage);
};