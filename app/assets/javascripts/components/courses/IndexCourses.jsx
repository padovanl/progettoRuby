class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            courses: [],
            searchCourses: [],
            error: '',
            search: '',
            page:1,
            searchPages: 1,
            autoCompleteResults: [],
            last_page: props.last_page,
            last_page_search: 1
        };


        this.handleError = this.handleError.bind(this);
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount(){
        this.getCourses();
    }

    componentDidUpdate(prevProps){
        if (this.props.last_page != prevProps.last_page)
            this.fetchData(this.props.last_page)
    }

    handleError(error){
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 10000)
        );
    }



    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    //    this.setState({searchPages:1})
        console.log("search: "+ this.state.search)
      /*  if (this.state.search === ''){
            this.setState({searchCourses: []})
            console.log("searchCourseS: "+this.state.searchCourses.length)
        }*/
    }


    //COURSES
    getCourses(){
        getAll(this.state.page)
            .then(teacher_courses => {
                const newCourses = this.state.courses.concat(teacher_courses);
                if (teacher_courses.length === 0)
                    return "Non ci sono altri corsi."
                this.setState({courses: newCourses})
            })
            .catch(this.handleError);
        this.setState({page: this.state.page +=1});
    }

    onChangePage() {
        console.log("nextButton on change page NORMALE")

        this.setState({searchCourses: [], searchPages: 1});//dev vedere  courses allora setto a [] gli searchCourses
        // update state with new page of items
        this.getCourses();
    }


    //CORSI OTTENUTI DALLA SEACH = searchCourses
    nextSearchButtonClick(){
        searchAll(this.state.search, this.state.searchPages)
            .then(newc => {
                const newCourses = this.state.searchCourses.concat(newc);
                if (newCourses.length === 0)
                    return <div> Nessun corso trovato. </div>
                this.setState({searchCourses: newCourses})
            })
            .catch(this.handleError);
        this.setState({searchPages: this.state.searchPages+=1});
    }


    onChangePageSearch(){
        this.setState({searchCourses: [], searchPages:1}); //sto facendo una nuova ricerca
        console.log("Azzerato")
        this.nextSearchButtonClick();
    }



    render(){
        console.log("num pagine: "+ this.props.last_page)

        let message;
        if (this.state.error){
            message = <span className='message is-danger'>{this.state.error}</span>;
        }

        let filteredCourses
        if (this.state.searchCourses.length === 0) {
            filteredCourses = this.state.courses.filter((item) => {
                    return item.course_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
           // console.log("ho esattamente "+ this.state.courses.length+ "courses")
        }
        else if (this.state.searchCourses.length !== 0){
            filteredCourses = this.state.searchCourses.filter((item) => {
                    return item.course_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
         //   console.log("ho esattamente "+ this.state.searchCourses.length + "searchCourses")
        }
        else
            return "Corsi non trovati.";

        var items = filteredCourses.map((item) => {
            return(
                <div key={item.id}>
                    <div className="nested infinite-item">
                        <div>Corso: {item.course_name}</div>
                        <div>Anno: {item.course_year}</div>
                        <div>Data: {item.year}</div>
                        <div>Professore:
                            <a href={item.teacher_cv}> {item.teacher_name} {item.teacher_surname}</a>
                        </div>
                    </div>
                    <div className="segui">
                        <div>Segui</div>
                    </div>
                </div>
            )
        });


        let searchButton;
        let nextButton;
        if (this.state.search === ''){
            searchButton = <div className=' button-search disabled'> <span>Search in all pages </span> </div>
            nextButton =    <div className='buttonnext' onClick={this.onChangePage}>
                <span> Next</span>
            </div>
        }
        else{
            searchButton = <div className=' button-search' onClick={this.onChangePageSearch.bind(this)}> <span>Search in all pages </span></div>
            nextButton =    <div className="buttonnext" onClick={this.nextSearchButtonClick.bind(this)}>
                <span> Next</span>
            </div>
        }

        if (this.state.searchCourses.length ===0){ //se i corsi ottenuti dalla ricerca sono 0, allora sto guardando quelli standard

        }
        else{ //guardo corsi ottenuti dalla ricerca
           // console.log("nextSearchButtonClick")


        }

        return(
            <div>
                <p>{message}</p>
                <div className='row'>
                    <form >
                        <div className='myColumn'>

                            Fare che in un click fa la ricerca e col secondo torna come prima
                        </div>
                    </form>
                </div>
                <div className="wrapper infinite-container">{items}</div>
                {nextButton}
                <input id="searchBar" className='search-form' type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search Courses by name"/>
                {searchButton}
            </div>
        )
    }
}

