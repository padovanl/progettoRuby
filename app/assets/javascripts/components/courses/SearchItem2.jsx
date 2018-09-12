class SearchItem2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //degree
            selectType: "- Select -",
            selectName: "- Select -",
            //selectAdvanced: 'Name',
            degreen: '',
            degreet: '',
            //advanced search
            category: 'Course',
            query: '',
            courses: [],
            //next button
            page: 1,
            disabledNext: false,
            //error or advertisement
            message: '',
            //allcourses or mycourses
            url: this.props.url,
            //autocomplete
            //value: '', -> uso la query
            suggestions: [],
            autoSuggestNames: []
        };
        console.log("**** courses: ", this.state.autoSuggestNames);
        this.onChangePage = this.onChangePage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.searchCourses = this.searchCourses.bind(this);
        this.resetAdvancedSearch = this.resetAdvancedSearch.bind(this);
        this.setSelectType = this.setSelectType.bind(this);
        this.reloadCourses = this.reloadCourses.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getAllNames = this.getAllNames.bind(this)

    }

    getAllNames(cat){
        getNames(cat)
            .then(res => {
                this.setState({autoSuggestNames: res})
            })
            .catch(err => console.log(err))
    }

    componentWillMount(){
        this.getAllNames(this.state.category)
    }

    resetAdvancedSearch(){
        this.setState({query: '' })
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("NEXT STATE CAT", nextState.category);
        if (nextState.category !== this.state.category){
            this.getAllNames(nextState.category)
        }
        return true;
    }


    checkCoursesFinded(data){
        if (data.length===0)
            this.setState({message: "Courses not found!"})
    }

    componentWillReceiveProps(nextProps){
        console.log("SI receive props");
        console.log("SI props last_page: "+nextProps.last_page);
    }

    getAllCourses(){
        console.log("page: ", this.state);
        this.setState({url: updateUrl(this.props.url, this.state.page, this.state.degreen, this.state.degreet, this.state.category, this.state.query)},
            () =>  getItems(this.state.url)
                .then(teacher_courses => {
                    const newCourses = this.state.courses.concat(teacher_courses);
                    if (teacher_courses.length === 0){
                        console.log("teacher_courses.length", teacher_courses.length);

                        this.setState({disabledNext: true});
                    }
                    this.setState({courses: newCourses})
                })
                .catch(err => console.log(err))
        )
    }

    reloadCourses(){
        this.setState({page:1, disabledNext: false, url: updateUrl(this.props.url, 1, this.state.degreen, this.state.degreet, this.state.category, this.state.query)},
            () =>  getItems(this.state.url)
                .then(courses => {
                    if (courses.length === 0){
                        console.log("courses. length", courses.length);
                        this.setState({disabledNext: true});}
                    this.setState({courses: courses})
                })
                .catch(this.handleError)
        )
    }

 /*   updateSearch(event){
        this.setState({query: event.target.value.substr(0,20).toLowerCase()});
    }
*/
    selectChanged(e){
        this.setState({category: e.target.value});
    }

    searchCourses(e){
        e.preventDefault();
        console.log("cat: "+this.state.category+ ", query "+ this.state.query + ", page "+ this.state.page);
        this.setState({page: 1, disabledNext:false, degreen: '', degreet: ''},
            ()=> getItems(updateUrl(this.props.url, this.state.page, '', '', this.state.category, this.state.query))
                .then(data => {
                    this.checkCoursesFinded(data);
                    console.log("data: "+data);
                    this.setState({courses: data});
                    console.log("data: "+ data.length)
                })
                .catch(this.handleError)
        )}


    onChangePage() {
        this.setState({page: this.state.page +=1},this.getAllCourses());
    }


    onSubmit(degree_name){
        console.log("SearchItem2 got: ", degree_name);
        this.setState({degreen: degree_name, degreet: this.state.selectType, disabledNext: false, page:1},
            ()=> getItems(updateUrl(this.props.url, this.state.page, this.state.degreen, this.state.degreet))
                .then(data => {
                    console.log("data: "+data);
                    this.setState({courses: data});
                    console.log("data: "+ data.length);
                    if (data.length ===0){
                        this.setState({disabledNext: true})
                    }
                })
                .catch(this.handleError)
        );
        console.log("Nuovi corsi dopo submit di Search_degree: ", this.state.courses)
    };


    setSelectType(value){
        this.setState({selectType: value})
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
            suggestions: getSuggestions(value, this.state.autoSuggestNames, this.state.category)
        });
    };

    onSuggestionsClearRequested(){
        this.setState({
            suggestions: []
        });
    };


    render(){
        let searchButton;
        if (this.state.query === '' || (this.props.last_page === true && this.state.changedInputSearch===false))
            searchButton = <div className=' button-search gap' onClick={(e)=>this.searchCourses(e)} > <span>All</span> </div>;
        else
            searchButton = <button className=' button-search gap' type={"submit"} > <span>Search</span></button>;

        let options = this.props.categories.map((opt) => {
            return(
                <option key={opt} value={opt}>{opt}</option>
            )
        });

        const  value =this.state.query;
        const suggestions = this.state.suggestions;
        const inputProps = {
            placeholder:"Search courses",
            value,
            onChange: this.onChange,
            type: "search",
            pattern: "[a-zA-Zàèéìòù0-9., ]*",
            title: "Sono vietati i caratteri speciali."
        };

        let indexCourses_or_myCourses;
        if(this.props.url === '/allcourses.json'){
            indexCourses_or_myCourses = <IndexCourses2 courses={this.state.courses}
                                                       page={this.state.page}
                                                       last_page={this.props.last_page}
                                                       url={this.state.url}
                                                       onChangePage={this.onChangePage}
                                                       disabledNext={this.state.disabledNext}
                                                       message={this.state.message}
                                                       reloadCourses={this.reloadCourses}
                                        />
        }
        else{
            indexCourses_or_myCourses = <MyCourses courses={this.state.courses}
                                                       page={this.state.page}
                                                       last_page={this.props.last_page}
                                                       url={this.state.url}
                                                       onChangePage={this.onChangePage}
                                                       disabledNext={this.state.disabledNext}
                                                       message={this.state.message}
                                                       reloadCourses={this.reloadCourses}
            />
        }

        return (
            <section>
                <div className='myRow'>
                    <div className="gap" align="center">
                        <div className="box" >
                            <form className='search-form' onSubmit={(e)=>this.searchCourses(e)}>
                                <h3><b><font color="#8b0000">Advanced Search:</font></b></h3>
                                <div className='columns'>
                                    <div className=' myColumn-sm' onClick={this.selectChanged.bind(this)}>
                                        <select required className='mySelect gap' >
                                            {options}
                                        </select>
                                    </div>
                                    <div className=' myColumn-md'>

                                        <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps}
                                            />

                                    </div>
                                    <div className=' myColumn-sm'> {searchButton} </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="myRow gap" >
                        <div align="center" className="gap">
                            <Search_degree onSubmit={(degreen, degreet) => this.onSubmit(degreen, degreet)}
                                           resetAdvancedSearch ={this.resetAdvancedSearch}
                                           selectType={this.state.selectType}
                                           selectName={this.state.selectName}
                                           setSelectType={this.setSelectType}
                            />
                        </div>
                    </div>
                    {indexCourses_or_myCourses}

                </div>
            </section>
        )
    }

}