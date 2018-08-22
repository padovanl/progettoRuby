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

const getAll = (page) => {
    let url =baseURL;
    const errorMessage = 'Errore durante il download dei dati';
    if (page!==1)
        url += "?page="+page;
    console.log("baseURL: "+url)
    return makeReq(url, errorMessage);
};


const searchAll = (category, query, page='') => {
    let url=baseURL;
    const errorMessage = 'Errore durante il search dei dati';
    if (page !== '')
        url = url+ "?page="+page+"?utf8=✓";
    url = url+ "&search="+query+"&category="+category;
  /*  if (category === "Name")
        url = url + "&search="+query+"&category="+category;
    if (category === "Year")
        url = url + "&search="+query;
    if (category === "Teacher")
        url = url + "search="+query;
    if (category === "Module")
        url = url + "search="+query;
*/

    console.log("url: "+url);
    return makeReq(url, errorMessage);
};