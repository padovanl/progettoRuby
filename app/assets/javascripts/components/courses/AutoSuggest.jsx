function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, courses, type) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    if (type === 'Course')
        return courses.filter(courses => regex.test(courses.name));
    else
        return courses.filter(courses => regex.test(courses.name) || regex.test(courses.surname))

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

