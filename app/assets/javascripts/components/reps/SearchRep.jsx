class SearchRep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query:'',
            suggestions: [],
            autoSuggestNames: [],

            isValidated: false,
            showError: false,

            selected_course: null,
            selected_my_post: null,
            selected_home_service: false,
            selected_offer: null,
            selected_place: null,
            selected_price: null
        };
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    componentWillMount(){
        getNames('Course')
            .then(data => {
                this.setState({autoSuggestNames: data})
            })
            .catch((e) => console.log(e))
    }


    handleSearch(e){
        e.preventDefault();
        const {selected_course,
            selected_my_post,
            selected_home_service,
            selected_offer,
            selected_place,
            selected_price} = this.state;


        URL = '/reps.json?page=1?utf8=✓';
        if (selected_offer)
            URL += '&offer=' + this.state.selected_offer;
        if (selected_place)
            URL += '&place=' + this.state.selected_place;
        if (selected_my_post)
            URL += '&user_id=' + selected_my_post;
        if (selected_home_service)
            URL += '&home_service=' + selected_home_service;
        if (selected_price)
            URL += '&price_hours=' + selected_price;

        getItems(URL)
            .then(resp => {
                updateIndexReps(URL, resp);
            })
            .catch(e => console.log(e))
    }


    handleChange(e){
        console.log(e.target.name + ": ", e.target.value );
        this.setState({[e.target.name]: e.target.value});
    }



    //***************** AUTO SUGGESTION (AUTO COMPLETE) **********************

    onChange(event, { newValue, method }){
        this.setState({
            query: newValue
        });
    };

    onSuggestionsFetchRequested({ value }){
        console.log("AutoSuggestName: ", this.state.autoSuggestNames);

        this.setState({
            suggestions: getSuggestions(value, this.state.autoSuggestNames, 'Course')
        });
    };

    onSuggestionsClearRequested(){
        this.setState({
            suggestions: []
        });
    };


    render(){
        //Autosuggestions
        const value =this.state.query;
        const suggestions = this.state.suggestions;
        const inputProps = {
            placeholder:"Search courses by name",
            value,
            onChange: this.onChange
        };

        return(
            <form onSubmit={(e) => this.handleSearch(e)}>
                <li>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </li>
                <li className="drawer-menu-item">
                    <div className="control ">
                        <label className="radio" >
                            <input key={1} type={"radio"} id={"offer"}
                                   onChange={(e)=>this.handleChange(e)} name={"selected_offer"} value={true}/> Offro
                        </label>
                        <label className="radio"  >
                            <input key={2} className="left-gap" type={"radio"} id={"offer"}
                                   onChange={(e)=>this.handleChange(e)} name={"selected_offer"} value={false} /> Cerco
                        </label>
                    </div>
                </li>
                <li className="drawer-menu-item">
                    <div className="control ">
                        <label className="radio" >
                            <input key={1}  type={"radio"} id={"price_hours"} name={"selected_price"} value={"ASC"}
                                   onChange={(e)=>this.handleChange(e)} /> Price Asc
                        </label>
                        <label className="radio"  >
                            <input key={2} type={"radio"} id={"price_hours"} name={"selected_price"} value={"DESC"}
                                   onChange={(e)=>this.handleChange(e)} className="left-gap" /> Price Desc
                        </label>
                    </div>
                </li>
                <li className="drawer-menu-item">
                    <label className="label">
                        Cerca secondo il luogo
                        <input name={"selected_place"} type={"text"}  pattern="[a-zA-Zàèéìòù ]*"
                               title={"Sono vietati i caratteri speciali."} value={this.state.place}
                               onChange={(e)=>this.handleChange(e)}/>
                    </label>
                </li>
                <li className="drawer-menu-item">
                    <label className="label">
                        <input name={"selected_home_service"} value={true} type="checkbox"
                               onChange={(e)=>this.handleChange(e)}/> Home service
                    </label>
                </li>
                <li className="drawer-menu-item">
                    <label className="label">
                        <input name={"selected_my_post"}  value={this.props.current_user.id} type="checkbox"
                               onChange={(e)=>this.handleChange(e)}/> Miei post
                    </label>
                </li>
                <button className="hero-buttons button-search" type="submit"> Search </button>
            </form>
        )
    }
}