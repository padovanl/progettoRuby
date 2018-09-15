function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, item, type) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    if (type === 'Course' || type === 'Theses')
        return item.filter(item => regex.test(item.name));
    else
        return item.filter(item => regex.test(item.name) || regex.test(item.surname))

}

function getSuggestionValue(suggestion) {
    if (suggestion.surname === undefined)
        return suggestion.name;
    return suggestion.surname + " " +  suggestion.name;
}

function renderSuggestion(suggestion) {
    if (suggestion.surname !== undefined)
        return (<span>{suggestion.surname + " " + suggestion.name}</span>);
    else
        return (<span>{ suggestion.name}</span>);
}

