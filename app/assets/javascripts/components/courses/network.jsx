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


const updateUrl=(page, category='', query='')=>{
    let url = "/allcourses.json?page="+page;
    if (query!=='') //se ho fatto la ricerca
        url = url+ "?utf8=✓"+ "&search="+query+"&category="+category;
    return url;
};

const getCourses = (url) => {
    const errorMessage = 'Errore durante il download dei dati';
    console.log("url usato nella ricerca: "+url);
    return makeReq(url, errorMessage);
};

/*
const searchAll = (category, query, page='') => {
    let url=baseURL;
    const errorMessage = 'Errore durante il search dei dati';
    if (page !== '')
        url = url+ "?page="+page+"?utf8=✓";
    url = url+ "&search="+query+"&category="+category;

    console.log("url: "+url);
    return makeReq(url, errorMessage);
};


*/