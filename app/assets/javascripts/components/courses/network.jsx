

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
    console.log("baseURL: "+baseURL)
    return makeReq(baseURL, errorMessage);
};


const searchAll = (course_name, page) => {
    const errorMessage = 'Errore durante il search dei dati';
    baseURL = "/allcourses.json?"+"page="+page+"?utf8=✓&search="+course_name;
    console.log("baseURL: "+baseURL)
    return makeReq(baseURL, errorMessage);
};