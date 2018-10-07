class SearchTheses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //autosuggestion theses_name
            suggestions: [],
            autoSuggestNames: [],
            //error
            showError: false,
            //names
            tags: [],
            teachers: [],
            //form for search theses
            selected_thesis_title: '',
            Tags: '',
            Teachers: '',

            message: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadNames = this.loadNames.bind(this)
    }


    componentDidMount(){

        getNames('Theses')
            .then(data => {
                this.setState({autoSuggestNames: data})
            })
            .catch((e) => console.log(e));

        getNames('Teachers')
            .then(data => {
                this.setState({teachers: data})
            })
            .catch((e) => console.log(e));

        getNames('Tags')
            .then(data => {
                this.setState({tags: data})
            })
            .catch((e) => console.log(e));
    }


    loadNames(type){
        getNames(type)
            .then(data => {
                this.setState({[type.toLowerCase()]: data})
            })
            .catch((e) => console.log(e));
    }

    handleSearch(e){
        e.preventDefault();

        const updateIndexTheses = this.props.updateIndexTheses;
        const {
            selected_thesis_title,
            Tags,
            Teachers,
            } = this.state;

        URL = '/theses.json?page=1?utf8=✓&per_page='+this.props.per_page;
        let url='';
        if(selected_thesis_title !== '')
            url += '&thesis_title=' + selected_thesis_title;
        if (Tags!=='')
            url += '&tag=' + Tags;
        if (Teachers!=='')
            url += '&teacher=' + Teachers;


        getItems(URL+url)
            .then(ts => {
                updateIndexTheses(url, ts);
            })
            .catch(e => console.log(e))
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    //***************** AUTO SUGGESTION (AUTO COMPLETE) **********************

    onChange(event, { newValue, method }){
        this.setState({
            selected_thesis_title: newValue
        });
    };

    onSuggestionsFetchRequested({ value }){

        this.setState({
            suggestions: getSuggestions(value, this.state.autoSuggestNames, 'Theses')
        });
    };

    onSuggestionsClearRequested(){
        this.setState({
            suggestions: []
        });
    };


    render(){
        //Autosuggestions
        const value =this.state.selected_thesis_title;
        const suggestions = this.state.suggestions;
        const inputProps = {
            placeholder:"Search theses",
            value,
            onChange: this.onChange,
            type: "search",
            pattern: "[a-zA-Zàèéìòù0-9., ]*",
            title: "Sono vietati i caratteri speciali.",
        };

        let tags = this.state.tags.map(tag => {
            return  <option key={tag.id} value={tag.id}>{tag.name}</option>
        });

        let teachers = this.state.teachers.map(teacher => {
            return  <option key={teacher.id} value={teacher.id}>{teacher.surname + " "+ teacher.name}</option>
        });


        return(

                        <form onSubmit={(e) => this.handleSearch(e)}>
                            <li className="drawer-brand">Ricerca</li>
                            <li className="drawer-menu-item">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </li>
                            <li className="drawer-menu-item ">
                                <p>Tag</p>
                                <div className="control has-icons-left">
                                    <div className={"select "}>
                                        <select name="Tags" onChange={(e)=>this.handleChange(e)}
                                                value={this.state.Tags ? this.state.Tags : '' }
                                        >
                                            <option value="">{"- Select -"}</option>
                                            {tags}
                                        </select>
                                    </div>
                                    <div className="icon is-small is-left">
                                        <i className="fas fa-globe"/>
                                    </div>
                                </div>
                            </li>
                            <li className="drawer-menu-item">
                                <p>Insegnante</p>
                                <div className="control has-icons-left">
                                    <div className={"select "}>
                                        <select name="Teachers" onChange={(e)=>this.handleChange(e)}
                                                value={this.state.Teachers ? this.state.Teachers : '' }
                                        >
                                            <option value="">{"- Select -"}</option>
                                            {teachers}
                                        </select>
                                    </div>
                                    <div className="icon is-small is-left">
                                        <i className="fas fa-globe"/>
                                    </div>
                                </div>
                            </li>
                            <li className="drawer-menu-item">
                                <div className="search-hero">
                                    <button className="button is-rounded is-info" type="submit">Cerca</button>
                                </div>
                            </li>
                            {/*servono per lo scroll*/}
                            <li className="drawer-menu-item">
                            </li>
                            <li className="drawer-menu-item">
                            </li>
                            <li className="drawer-menu-item">
                            </li>
                        </form>


        )
    }
}