function makeReq(url, errorMessage = '', options = {credentials: 'same-origin'}) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(errorMessage);
            }
        });
}


const getNames=(category)=>{
    let url;
  if (category  === 'Course')
      url = '/courses_name.json';
  else if (category  === 'Tags')
      url = '/tags.json';
  else if (category === 'Theses')
      url = '/theses_title.json';
  else if (category === 'Places')
      url = 'get_places.json';
  else
      url = '/teachers_name.json';

    const errorMessage = 'Errore durante il download dei dati';
  //  console.log("url usato nella ricerca dei NOMI: "+url);
    return makeReq(url, errorMessage);
};

const updateUrl=(url, per_page, page, degreen='', degreet='', category='', query='')=>{
    let new_url = url+"?per_page="+per_page+"&page="+page+"?utf8=✓";
    if (degreen !== '')
        new_url = new_url + "&degreen="+degreen+"&degreet="+degreet;
    if (query!=='') //se ho fatto la ricerca
        new_url = new_url + "&search="+query+"&category="+category;
    return new_url ;
};

const updateUrlReps = (props_url, props_per_page, url, page) => {
    return props_url+page+ "&per_page="+props_per_page+url;
};


const getItems = (url) => {
    const errorMessage = 'Errore durante il download dei dati';
   // console.log("url usato nella ricerca: "+url);
    return makeReq(url, errorMessage);
};

const getDegreesName = (degree) => {
    let url = "/search_degrees.json?utf8=✓&"+degree;
    const errorMessage = 'Errore durante il download dei dati';
 //   console.log("url usato nella ricerca: "+url);
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