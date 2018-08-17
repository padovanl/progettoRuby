class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {allcourses: [], error: '', search:''};

        this.handleError = this.handleError.bind(this);
        this.handleChose = this.handleChose.bind(this);
    }


    handleError(error){
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 10000)
        );
    }



    handleChose(id) {
        redirect(id) //da sistemare
            .catch(this.handleError);
    }


    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    componentDidMount(){
        getAll()
            .then(teacher_courses => {
                this.setState({allcourses: teacher_courses})
            })
            .catch(this.handleError);
    }


    render(){
        let filteredCourses = this.state.allcourses.filter((item) => {
            return item.course.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
            }

        );
        let message;

        if (this.state.error){
            message = <span className='message is-danger'>{this.state.error}</span>;
        }


        if (this.state.allcourses.nil)
            return <div> Nessun corso presente </div>
        else

            var items = filteredCourses.map((item) => {
                return(
                    <div>
                        <div className="nested" key={item.id}>
                            <div>Corso: {item.course.name}</div>
                            <div>Anno: {item.course.year}</div>
                            <div>Data: {item.data}</div>
                            <div>Professore:
                                <a href={item.teacher.link_cv}> {item.teacher.name} {item.teacher.surname}</a>
                            </div>
                        </div>
                        <div className="segui">
                            <div>Segui</div>
                        </div>
                    </div>
                )
            });

            return(
                <div className="column is-12">
                    <p>{message}</p>
                    <input className='search-form' type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search Courses by name"/>
                    <div className="wrapper">{items}</div>
                    <div className="buttonnext">
                        <span>Next</span>
                    </div>
                </div>
            )
    }
}



//export default IndexCourses
/*
const coursesNode = document.querySelector('#coursesNode');

const Course = props =>( <li > {props.course.name}  {props.course.year} </li>)


const AllUserCourses = ({courses}) => {
    const allcourses = courses.map(course => <Course key={course.id} />);
    ciao

    return(
        <ul>{allcourses}</ul>
    )
}

ReactDom.render(<AllUserCourses />, coursesNode)
*/