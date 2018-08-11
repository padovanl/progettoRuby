class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {allcourses: [], error: 'pino'};

        this.handleError = this.handleError.bind(this);
    }


    handleError(error){
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 10000)
        );
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
        if (this.state.error){
            message = <span className= 'message is-danger'>{this.state.error}</span>;
        }
//        const Course = props =>( <li > {props.course.name}  {props.course.year} </li>);

        var items = this.state.allcourses.map((item) => {
            return(
                <div key={item.id}>
                    <li>{item.name}</li>
                </div>
            )
        });

        return(
            <div>
                <p>{message}</p>
                <ul>{items}</ul>
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