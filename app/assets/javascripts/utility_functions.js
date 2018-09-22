const MONTH_NAMES = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${ minutes }`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${ prefomattedDate } alle ${ hours }:${ minutes }`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${ day } ${ month } alle ${ hours }:${ minutes }`;
    }

    // 10. January 2017. at 10:20
    return `${ day } ${ month } ${ year } alle ${ hours }:${ minutes }`;
}


// --- Main function
function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'adesso';
    } else if (seconds < 60) {
        return `${ seconds } secondi fa`;
    } else if (seconds < 90) {
        return 'circa un minuto fa';
    } else if (minutes < 60) {
        return `${ minutes } minuti fa`;
    } else if (isToday) {
        return getFormattedDate(date, 'Oggi'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Ieri'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}

// -- generic report funtion --

function handleReport(linkReport){
    // /courses/:course_id/questions/:id(.:format)
    //let linkReport = '/report_tip/' + id;
    var myHeaders = new Headers();
    myHeaders.append('X-CSRF-Token', Rails.csrfToken());
    myHeaders.append('Content-Type', 'application/json');
    console.log(linkReport)
        if(confirm('Sei sicuro di voler segnalare questo post?')){
        fetch(linkReport,
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: myHeaders
            }).then((response) => {
            if (response.ok){
                toastr.success("Post segnalata con successo")
            }else{
                alert("errore")
            }
        })
    }
}