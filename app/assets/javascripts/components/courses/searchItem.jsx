class SearchItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: props.categories,
            category: 'Name',
            query: '',
            page: 1,
            autoCompleteResults: [],
            itemSelected: {},
            showItemSelected: false
        };

    }


    updateSearchName(event){
        this.setState({query: event.target.value.substr(0,20)});
    }
    updateSearchYear(event){
        this.setState({year: event.target.value.substr(0,20)});
    }
    updateSearchTeacher(event){
        this.setState({teacher: event.target.value.substr(0,20)});
    }
    updateSearchModule(event){
        this.setState({module: event.target.value.substr(0,20)});
    }


    selectChanged(e){
        this.setState({category: e.target.value});
        console.log("select changed: "+this.state.category)
    }


    redirectSearch(){
        console.log("cat: "+this.state.category+ ", query "+ this.state.query + ", page "+ this.state.page)
        searchAll(this.state.category, this.state.query, this.state.page)
            .then(data=> {
                externalSetStateCourses(data);
                console.log("data "+data)

        })
    }


    render(){
        let searchButton;
        if (this.state.query === '')
            searchButton = <div className=' button-search disabled'> <span>Search in all pages </span> </div>;
        else
            searchButton = <div className=' button-search' onClick={this.redirectSearch.bind(this)} > <span>Search in all pages </span></div>;

        let options = this.state.categories.map((opt) => {
            return(
                <option key={opt} value={opt}>{opt}</option>
            )
        });



        return (
            <div className='column is-12'>
                <div onClick={this.selectChanged.bind(this)}>
                    <select>
                        {options}
                    </select>
                </div>
                <input id="searchBar" className='search-form' type="text" value={this.state.name} onChange={this.updateSearchName.bind(this)} placeholder="Search courses by name"/>
                {searchButton}
            </div>
        )
    }
}
