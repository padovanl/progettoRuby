class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {allcourses: [], error: ''};

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleChose.bind(this);
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



    componentDidMount(){
        getAll()
            .then(courses => {
                this.setState({allcourses: courses})
            })
            .catch(this.handleError);
    }


    render(){
        let message;
        let count=0;

        if (this.state.error){
            message = <span className='message is-danger'>{this.state.error}</span>;
        }
//        const Course = props =>( <li > {props.course.name}  {props.course.year} </li>);

        var items = this.state.allcourses.map((item) => {
            return(
                <div className="nested">
                    <div  key={item.id}>{item.name} <br /> Anno: {item.year}</div>
                </div>
            )
        });

        return(
            <div>
                <p>{message}</p>
                <div className="wrapper">{items}</div>
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