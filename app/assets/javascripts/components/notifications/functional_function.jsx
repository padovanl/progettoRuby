function make_request(url, errorMessage = '', options = {credentials: 'same-origin'}) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(errorMessage);
            }
        });
}

const update_url_notifications = (props_url, url, page) => {
    return props_url+page+url;
};


const get_items = (url) => {
    const errorMessage = 'Errore durante il download dei dati';
    return make_request(url, errorMessage);
};
