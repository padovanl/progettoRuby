function externalSetStateCourses(data){
    console.log("data: " + data);
    this.setState({courses: data})
}
function setClickedButtonSearch(data){
    this.setState({clickedButtonSearch: data})
}
function externalConcatStateCourses(data){
    this.setState({courses: this.state.courses.concat(data)})
}
function externalBackCourses() {
    this.setState({courses: [],clickedButtonSearch: false, page: 1},this.getCourses());
}

class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            error: '',
            search: '',
            page:1,
            clickedButtonSearch: false,
            autoCompleteResults: [],
            last_page: props.last_page,
        };
        this.handleError = this.handleError.bind(this);
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        externalSetStateCourses = externalSetStateCourses.bind(this);
        setClickedButtonSearch = setClickedButtonSearch.bind(this);
        externalConcatStateCourses = externalConcatStateCourses.bind(this);
        externalBackCourses = externalBackCourses.bind(this);
    }

    componentDidMount(){
        this.getCourses();
    }

    componentWillUpdate(nextProps, nextState){
        console.log("IC componentDidUpdate");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevState: "+prevState.page);
        console.log("IC componentDidUpdate");
    }

    handleError(error){
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 10000)
        );
    }



    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }


    //COURSES
    getCourses(){
        getAll(this.state.page)
            .then(teacher_courses => {
                const newCourses = this.state.courses.concat(teacher_courses);
                if (teacher_courses.length === 0)
                    return "Non ci sono altri corsi.";
                this.setState({courses: newCourses})
            })
            .catch(this.handleError);

    }

    onChangePage() {
        this.setState({page: this.state.page +=1},this.getCourses());
        // update state with new page of items
    }



    render(){
        let message;
        if (this.state.error){
            message = <span className='message is-danger'>{this.state.error}</span>;
        }

        let filteredCourses;
        if (this.state.courses.length !== 0){
            filteredCourses = this.state.courses.filter((item) => {
                    return item.course_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
        }
        else
            return "Corsi non trovati.";

        let buttonNext;
        if (this.state.page !== this.state.last_page && this.state.clickedButtonSearch === false){
            buttonNext= <div className='buttonnext' onClick={this.onChangePage} >
                            <span> Next </span>
                        </div>
        }
        else {
            buttonNext=<div className='buttonnext disabled'>
                            Next
                        </div>
        }

        let items = filteredCourses.map((item) => {
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

        return(
            <div className='myColumn-lg'>
                <hr className='gap'/>
                <p>{message}</p>
                <div className="wrapper infinite-container">{items}</div>
                <div className='row'>
                    {buttonNext}
                    <input className='input-form gap' type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Filter courses by name"/>
                </div>
            </div>
        )
    }
}


