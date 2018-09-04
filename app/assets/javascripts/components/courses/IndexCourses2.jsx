class IndexCourses2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            modalState: false
            //autoCompleteResults: [],
        };

        this.showModal = this.showModal.bind(this);
        console.log("props: "+props.onChangePage);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buttonFollowClicked = this.buttonFollowClicked.bind(this);
        this.linkToCourseView = this.linkToCourseView.bind(this)
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

    showModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }

    closeModal() {
        this.setState({modalState: false}, this.props.reloadCourses());
    }


    //@observable all = [];

    /*@action async fatchAll(){
        const respone = await fetch({allcourses_path});
        const status = await response.status;

        if (status ===200){
            this.all = await response.json();
        }
    }
*/
    handleSubmit(event) {
        event.preventDefault(); //blocca comportamento predefinito: reload pagina e cancellazione di tutto

        console.log("nome corso: ", event.target[2].name, "id corso ", event.target[2].value );
        this.setState({courseName: event.target[2].name, courseId: event.target[2].value});

        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
     //   myHeaders.append('Content-Type', 'application/json');

        //user_id, course_id, follow=true lo faccio direttamente nel controller (chiamando la funzione dal model)
        const data = new FormData(event.target); // event.target gives you the native DOMNode

        const options = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: (data),
        };

        const request = new Request('/follow', options);

        fetch(request)
            .then(response => {
                return response.json();
            })
            .catch(error => console.log(error));
    }


    buttonFollowClicked(e){
        //funzione per l'Allert se è sicuro di seguire quel corso
        this.handleSubmit(e);    //funz che seguo il corso e lo inserisco nel db,
        //funzione che fa scegliere se reindirizzare nella show di quel corso o di continuare con un modal
        this.showModal()
    }


    linkToCourseView(){
      return 'courses/'+this.state.courseId
    }




    render(){
        let filteredCourses;
        if (this.props.courses.length !== 0)
            filteredCourses = this.props.courses.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
        else
            return (<message className={"message is-danger gap"}  >
                        <div className="message-body">
                            {this.props.message }
                        </div>
                    </message>);



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
                        <form onSubmit={(e)=>this.buttonFollowClicked(e)}>
                            <input className="input" name="user_course[course_id]" value={item.id} type="hidden" />
                            <input className="input" name="user_course[follow]" value={true} type="hidden" />
                            <button name={item.name}  className="segui" value={ item.id}>
                                <div>Follow</div>
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
                                        <i className="far fa-grin-alt fa-4x" />
                                    </figure>
                                </div>
                                <div className={"media-content "}>
                                    <p>
                                        <strong>Corso <span className={"has-text-success"}>{this.state.courseName}</span> aggiunto tra i seguiti! </strong>
                                        <br/>
                                        <span>Vuoi visualizzarlo?</span>
                                    </p>
                                    <a className="segui" href={this.linkToCourseView()} >
                                        Show Course                                    </a>

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