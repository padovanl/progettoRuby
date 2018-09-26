class SearchRep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            autoSuggestNames: [],

            isValidated: false,
            showError: false,

            selected_course: '',
            selected_my_post: false,
            selected_home_service: false,
            selected_offer: null,
            selected_place: '',
            selected_price: null
        };
        this.onChange = this.onChange.bind(this);
  //      this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
   //     this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
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
        let url='';
        if(selected_course !== '')
            url += '&course_name=' + this.state.selected_course;
        if (selected_offer)
            url += '&offer=' + this.state.selected_offer;
        if (selected_place)
            url += '&place=' + this.state.selected_place;
        if (selected_my_post === true)
            url += '&user_id=' + this.props.current_user.id;
        if (selected_home_service===true)
            url += '&home_service=' + selected_home_service;
        if (selected_price)
            url += '&price_hours=' + selected_price;

        getItems(URL+url)
            .then(resp => {
                updateIndexReps(url, resp);
            })
            .catch(e => console.log(e))
    }


    handleChange(e){
        const item = e.target.name;
        if (item === "selected_my_post"){
            this.setState(prevState => ({ [item]: !prevState.selected_my_post}));
        }
        else if (item === "selected_home_service"){
            this.setState(prevState => ({ [item]: !prevState.selected_home_service}));
        }
        else
            this.setState({[e.target.name]: e.target.value});
    }



    //***************** AUTO SUGGESTION (AUTO COMPLETE) **********************

    onChange(event){//, { newValue, method }){
        this.setState({
            selected_course: event.target.value//newValue
        });
    };

/*    onSuggestionsFetchRequested({ value }){
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
*/

    render(){
        //Autosuggestions
  /*      const value =this.state.selected_course;
        const suggestions = this.state.suggestions;
        const inputProps = {
            placeholder:"Search courses",
            value,
            onChange: this.onChange,
            type: "search",
            pattern: "[a-zA-Zàèéìòù0-9., ]*",
            title: "Sono vietati i caratteri speciali."
        };
*/
        let opts = this.state.autoSuggestNames.map(course => {
            return <option key={course.id}  value={course.name}>{course.name}</option>
        });

        return(
            <form onSubmit={(e) => this.handleSearch(e)}>
                <li className="drawer-menu-item">
                    <div className="field">
                        <div className="control">
                            <div className="select">
                                <select className=" mySelect select-width" onChange={(e)=>this.onChange(e)}>
                                    <option value={''}>- Select -</option>
                                    {opts}
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="drawer-menu-item">
                    <div className="control ">
                        <label><strong>Rep</strong></label><br/>
                        <label className="radio" >
                            <input key={1} type={"radio"} id={"offer"}
                                   onChange={(e)=>this.handleChange(e)} name={"selected_offer"} value={true}/> Offro
                        </label>
                        <label className="radio"  >
                            <input key={2} className="left-gap" type={"radio"} id={"offer"}
                                   onChange={(e)=>this.handleChange(e)} name={"selected_offer"} value={false} /> Cerco
                        </label>
                        <label className="radio"  >
                            <input key={3} className="left-gap" type={"radio"} id={"offer"}
                                   onChange={(e)=>this.handleChange(e)} name={"selected_offer"} value={undefined} /> Reset
                        </label>
                    </div>
                </li>
                <li className="drawer-menu-item">
                    <div className="control ">
                        <label><strong>Price</strong></label><br/>
                        <label className="radio" >
                            <input key={1}  type={"radio"} id={"price_hours"} name={"selected_price"} value={"ASC"}
                                   onChange={(e)=>this.handleChange(e)} /> Asc
                        </label>
                        <label className="radio"  >
                            <input key={2} type={"radio"} id={"price_hours"} name={"selected_price"} value={"DESC"}
                                   onChange={(e)=>this.handleChange(e)} className="left-gap" /> Desc
                        </label>
                        <label className="radio"  >
                            <input key={3} className="left-gap" type={"radio"} id={"price_hours"}
                                   onChange={(e)=>this.handleChange(e)} name={"selected_price"} value={undefined} /> Reset
                        </label>
                    </div>
                </li>
                <li className="drawer-menu-item">
                    <label className="label">
                        Cerca secondo il luogo
                        <input name={"selected_place"} type={"search"}  pattern="[a-zA-Zàèéìòù ]*"
                               title={"Sono vietati i caratteri speciali e numeri."} value={this.state.place}
                               onChange={(e)=>this.handleChange(e)}/>
                    </label>
                </li>
                <li className="drawer-menu-item">
                    <label className="label">
                        <input name={"selected_home_service"} value={this.state.selected_home_service} type="checkbox"
                               onChange={(e)=>this.handleChange(e)}/> Home service
                    </label>
                </li>
                <li className="drawer-menu-item">
                    <label className="label">
                        <input name={"selected_my_post"} value={this.state.selected_my_post} type="checkbox"
                               onChange={(e)=>this.handleChange(e)}/> Miei post
                    </label>
                </li>
                <div className="search-hero">
                    <button className="button is-rounded is-info" type="submit">Cerca</button>
                </div>
            </form>
        )
    }
}