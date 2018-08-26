class IndexCourses2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
       //     courses: props.courses,
            error: '',
            search: '',
            //page: props.page,
            //last_page: props.last_page,
            //url: props.url,
            //query:props.query
            //clickedButtonSearch: false,
            //autoCompleteResults: [],
        };
        console.log("props: "+props.onChangePage);
    }

    componentWillReceiveProps(nextProps){
        console.log("IC receive props");
        console.log("IC props courses: "+nextProps.courses);
        console.log("IC props page: "+nextProps.page);
        console.log("IC props last_page: "+nextProps.last_page);
        console.log("IC props url: "+nextProps.url);
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }



    render(){
        let message;
        if (this.state.error){
            message = <span className='message is-danger'>{this.state.error}</span>;
        }


        let filteredCourses;
        if (this.props.courses.length !== 0)
            filteredCourses = this.props.courses.filter((item) => {
                    return item.course_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
        else
            return "Corsi non trovati.";


        let buttonNext;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext){
            buttonNext= <div className='buttonnext' onClick={() => this.props.onChangePage()}>
                        <span> Next </span> </div>
        }
        else {
            buttonNext=<div className='buttonnext disabled'>Next</div>
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