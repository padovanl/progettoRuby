/*import Waypoint from 'react-waypoint';

var infinite = new Waypoint.Infinite({
    element: $('.infinite-container')[0]
})
*/
class IndexCourses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {allcourses: [], error: '', search:'', page:1};

        this.handleError = this.handleError.bind(this);
    }


    handleError(error){
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 10000)
        );
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
            return item.course_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
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
                            <div>Corso: {item.course_name}</div>
                            <div>Anno: {item.course_year}</div>
                            <div>Data: {item.data}</div>
                            <div>Professore:
                                <a href={item.teacher_link_cv}> {item.teacher_name} {item.teacher_surname}</a>
                            </div>
                        </div>
                        <div className="segui">
                            <div>Segui</div>
                        </div>
                    </div>
                )
            });

            return(
                <div>
                    <p>{message}</p>
                    <input className='search-form' type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search Courses by name"/>
                    <div className="wrapper infinite-container">{items}</div>
                    <div className="buttonnext">
                        <span>Next</span>
                    </div>
                </div>
            )
    }
}

