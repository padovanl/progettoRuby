class SearchItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            autoCompleteResults: [],
            itemSelected: {},
            showItemSelected: false
        };

        $.getJSON('/search?q=' + this.state.term)
            .then(response => this.setState({autoCompleteResults: response.items}))
    }


    getAutoCompleteResults(e){
        this.setState({
            term: e.target.value
        }, () => {
            $.getJSON('/search?q=' + this.state.term)
                .then(response => this.setState({ autoCompleteResults: response.items }))
        });
    }




    render(){
        let autoCompleteList = this.state.autoCompleteResults.map((response, index) => {
            return <div key={index}>
                <h2>{response.name}</h2>
            </div>
        });

        return (
            <div>
                <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder='Search...' />
                { autoCompleteList }
            </div>
        )
    }
}
/*
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <SearchItem />,
        document.body.appendChild(document.createElement('div')),
    )
});
*/