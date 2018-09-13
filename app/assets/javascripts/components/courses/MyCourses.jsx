class MyCourses extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            modalState: false,
            event_target: null,
            courseName: '',
            courseId: ''
        };

        this.showModal = this.showModal.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.buttonUnfollowClicked = this.buttonUnfollowClicked.bind(this);
    }

    componentWillReceiveProps(nextProps){
 /*       console.log("IC receive props");
        console.log("IC props courses: "+nextProps.courses);
        console.log("IC props page: "+nextProps.page);
        console.log("IC props last_page: "+nextProps.last_page);
        console.log("IC props url: "+nextProps.url);
   */ }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    showModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }

    closeModal() {
        this.setState({modalState: false});
    }



    handleUnfollow() {
        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        const deleteCourse = this.props.deleteCourse;
        const id = this.state.courseId;

        const data = new FormData(this.state.event_target); // event.target gives you the native DOMNode

        const options = {
            method: 'PUT',
            headers: myHeaders,
            credentials: 'same-origin',
            body: (data),
        };

        const request = new Request('/unfollow', options);

        fetch(request)
            .then(function () {
                console.log("course id 2: ", id);
                deleteCourse(id);
            })
            .catch(error => console.log(error));

        this.closeModal();
    }


    buttonUnfollowClicked(event){
        event.preventDefault(); //blocca comportamento predefinito: reload pagina e cancellazione di tutto
        this.setState({event_target: event.target, courseName: event.target[1].name, courseId: event.target[1].value},
            () => this.showModal());
        console.log("course id 1", this.state.courseId, " event", event.target[1].value)
    }






    render(){
        let filteredCourses;
        if (this.props.courses.length !== 0)
            filteredCourses = this.props.courses.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
        else{
            if (this.props.message === ''){
                return ''
            }
            return (<div className={"message is-danger gap"}  >
                        <div className="message-body">
                            {this.props.message }
                        </div>
                    </div>);
        }



        let buttonNext;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext){
            buttonNext= <div className='buttonnext' onClick={() => this.props.onChangePage()}>
                <span> Next </span> </div>
        }
        else {
            buttonNext=<div className='buttonnext disabled'>Next</div>
        }

        let items = filteredCourses.map((item) => {

            if (item.teachers.length ===0){
                return "sedds from course "+item.id+"teachers sno ancora da fare"
            }

            let teachers = item.teachers.map( teacher => {
                return (
                    <li key={teacher.link_cv}>
                        <a href={teacher.link_cv}> {teacher.surname} {teacher.name}</a>
                    </li>
                )
            } );


            //bisognerebbe fare tornare direttamente dal controller l'array ordinato con limit 1 per l'anno di teacher courses (migliori prestazioni)
            return(
                <div key={item.id} className={"relative"}>
                    <div className="nested infinite-item">
                        <div>Materia: {item.name} e id: {item.id}</div>
                        <div>Livello: {item.degreet}</div>
                        <div>Corso: {item.degreen}</div>
                        <div>Anno: {item.year}</div>
                        <div>Data più recente: {item.tc_year.reverse()[0].year}</div>
                        <div>Professori:
                            <courses-ol>{teachers}</courses-ol>
                        </div>
                    </div>
                    <div className={"absolute"}>
                        <form onSubmit={(e)=>this.buttonUnfollowClicked(e)}>
                            <input className="input" name="user_course[course_id]" value={item.id} type="hidden" />
                            <button name={item.name}  className="unfollow" value={ item.id}>
                                <div>Unfollow</div>
                            </button>
                        </form>
                    </div>
                </div>
            )
        });

        return(
            <div className='myColumn-lg' id="modal">
                <hr className='gap'/>
                <div className="wrapper infinite-container">{items}</div>
                <div className='row'>
                    {buttonNext}
                    <input className='input-form gap' type="text"  value={this.state.search}
                           onChange={this.updateSearch.bind(this)} placeholder="Filter courses by name"/>
                </div>

                <div className={"modal " + (this.state.modalState ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.closeModal.bind(this)} />
                    <div className="modal-content">
                        <div className={"box"}>
                            <article className={"media"}>
                                <div className={"media-left"}>
                                    <figure className="image is-64x64">
                                        <i className="far fa-frown-open fa-4x" />
                                    </figure>
                                </div>
                                <div className={"media-content "}>
                                    <p>
                                        <strong>Sicuro di voler smettere di seguire il corso <span className={"has-text-success"}>{this.state.courseName}</span> !?</strong>
                                        <br/>
                                        <span>Perché non rimani per aiutare i tuoi colleghi? :)</span>
                                    </p>
                                    <button className="unfollow" onClick={() => this.handleUnfollow()} >
                                        <span>Unfollow</span>
                                    </button>

                                    <button className="modal-close is-large" aria-label="close"
                                            onClick={this.closeModal.bind(this)} />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}