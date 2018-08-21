class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            allcourses: [],
            error: props.search,
            search: '',
            page:1,
            autoCompleteResults: []
        };

        this.handleError = this.handleError.bind(this);
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);

    }


    handleError(error){
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 10000)
        );
    }



    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }



    getCourses(){
            getAll(this.state.page)
                .then(teacher_courses => {
                    const newCourses = this.state.allcourses.concat(teacher_courses);
                    if (teacher_courses.length === 0)
                        return "Non ci sono altri corsi."
                    this.setState({allcourses: newCourses})
                })
                .catch(this.handleError);
            this.setState({page: this.state.page +=1});
    }


    componentDidMount(){
        if (this.state.search ==='')
            this.getCourses();
    }


    //--------------
    onChangePage() {
        // update state with new page of items
        this.getCourses();
    }





    searchButtonClick(){
        searchAll(this.state.search)
            .then(newCourses => {
                if (newCourses.length === 0)
                    return <div> Nessun corso trovato. </div>
                this.setState({allcourses: newCourses})
            })
            .catch(this.handleError);
    }



    //-------------



    render(){
        let filteredCourses = this.state.allcourses.filter((item) => {
                return item.course_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
            }

        );
        let message;

        if (this.state.error){
            message = <span className='message is-danger'>{this.state.error}</span>;
        }


        if (this.state.allcourses.length === 0)
            return <div> Nessun corso presente </div>
        else

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
        if (this.state.search === ''){
            searchButton = <div className=' button-search disabled'> <span>Search in all pages </span> </div>
        }
        else{
            searchButton = <div className=' button-search' onClick={this.searchButtonClick}> <span>Search in all pages </span></div>
        }

        return(
            <div>
                <p>{message}</p>
                <div className='row'>
                    <form >
                        <div className='myColumn'>
                            <input id="searchBar" className='search-form' type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search Courses by name"/>
                            {searchButton}
                            Fare che in un click fa la ricerca e col secondo torna come prima
                        </div>
                    </form>
                </div>
                <div className="wrapper infinite-container">{items}</div>
                <div className='buttonnext' onClick={this.onChangePage}>
                    <span> Next</span>
                </div>
            </div>
        )
    }
}

