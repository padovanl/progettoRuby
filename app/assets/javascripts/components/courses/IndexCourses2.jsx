class IndexCourses2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            modalState: false
            //autoCompleteResults: [],
        };

        this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buttonFollowClicked = this.buttonFollowClicked.bind(this);
        this.linkToCourseView = this.linkToCourseView.bind(this)
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
        this.setState({modalState: false});
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

        const id = event.target[2].value;
        this.setState({courseName: event.target[2].name, courseId: id});

        const deleteCourse = this.props.deleteCourse;
        const showModal = this.showModal;
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
            .then(function(){
                deleteCourse(id)
            })
            .then(function () {
                showModal()
            })
            .catch(error => console.log(error));
    }


    buttonFollowClicked(e){
        //funzione per l'Allert se è sicuro di seguire quel corso
        this.handleSubmit(e);    //funz che seguo il corso e lo inserisco nel db,
        //funzione che fa scegliere se reindirizzare nella show di quel corso o di continuare con un modal

    }


    linkToCourseView(){
      return 'courses/'+this.state.courseId
    }




    render(){
        let filteredCourses;
        if ( this.props.message === '')//message = '' caso in cui ho tolto il corso con follow
            filteredCourses = this.props.courses.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; //tutti
                }
            );
        else{
            return (<div className="is-danger container" style={{textAlign: 'center', background: '#ffa726', padding: '20px'}} >
                <div>
                    {this.props.message }
                </div>
            </div>);
        }



        let buttonNext;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext && this.state.search=== ''){
            buttonNext= <button className='button is-rounded is-info' onClick={() => this.props.onChangePage()}>
                        <span> Next </span> </button>
        }
        else {
            buttonNext=<button className='button is-rounded is-info disabled'>Next</button>
        }

        let items = filteredCourses.map((item) => {

            /*if (item.teachers.length ===0){
                return "seeds from course "+item.id+"teachers sno ancora da fare"
            }

            let teachers = item.teachers.map( teacher => {
                return (
                        <li key={teacher.link_cv}  className="left-gap">
                            <a href={teacher.link_cv}> {teacher.surname} {teacher.name}</a>
                        </li>
                )
            } );*/


            //bisognerebbe fare tornare direttamente dal controller l'array ordinato con limit 1 per l'anno di teacher courses (migliori prestazioni)
            return(
                <div key={item.id} className="box relative is-marginless course-card">
                    <div className="nested infinite-item">
                        <h3 className="title" id="course-name-second"><a href={"/courses/"+item.id}>{item.name}</a></h3>
                        <div><strong>Livello:</strong> {item.degreet}</div>
                        <div><strong>Corso:</strong> {item.degreen}</div>
                        <div><strong>Anno:</strong> {item.year}</div>
                        <div><strong>Professore:</strong>
                            <a href={item.current_teacher.teacher.link_cv}>
                                {' '+item.current_teacher.teacher.surname+' '+item.current_teacher.teacher.name }
                            </a>
                            {' '+item.current_teacher.year+''}
                        </div>
                    </div>
                    <div className={"absolute"}>
                        <form onSubmit={(e)=>this.buttonFollowClicked(e)}>
                            <input className="input" name="user_course[course_id]" value={item.id} type="hidden" />
                            <input className="input" name="user_course[follow]" value={true} type="hidden" />
                            <button name={item.name}  className="button is-success is-rounded" value={ item.id}>
                                <div>Segui</div>
                            </button>
                        </form>
                    </div>
                </div>
            )
        });

        return(
            <div className='myColumn-lg container'>
                <hr className='gap'/>
                <div className="wrapper infinite-container">{ items }</div>
                <div className='row next-button'>
                    { buttonNext }
                    { /*<input className='input-form gap left-gap' type="text"  value={this.state.search}
                           onChange={this.updateSearch.bind(this)} placeholder="Filter courses by name"/>*/ }
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
                                    <a className="button is-rounded is-success" href={this.linkToCourseView()} >
                                        Mostra Corso</a>

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