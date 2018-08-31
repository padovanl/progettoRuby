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


    //PUÒ ISCRIVERSI SOLO SE PASSED=FALSE (DELLA TAB USER_COURSES)
    async handleSubmit(event) {
        event.preventDefault(); //blocca comportamento predefinito: reload pagina e cancellazione di tutto

        const myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        //user_id, course_id, follow=true lo faccio direttamente nel controller (chiamando la funzione dal model)
        let data = new FormData(event.target); //id corso; event.target gives you the native DOMNode

        //const addNewPost = this.props.addNewPost

        const options = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data,
        };

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        const request = new Request('/follow', options);

        await fetch(request)
            .then(handleErrors)
            .then(response => {
                return response.json();
            })
            .catch(error => console.log(error));

        //document.getElementById("post_attachments").value = null; -> mdifico in rosso per unfollow
    }

    buttonFollowClicked(e){
        //funzione per l'Allert se è sicuro di seguire quel corso
        //funz che seguo il corso e lo inserisco nel db,
        //funzione che fa scegliere se reindirizzare nella show di quel corso o di continuare con un modal
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
                        <div>Materia: {item.course_name}</div>
                        <div>Livello: {item.degreet}</div>
                        <div>Corso: {item.degreen}</div>
                        <div>Anno: {item.course_year}</div>
                        <div>Data: {item.year}</div>
                        <div>Professore:
                            <a href={item.teacher_cv}> {item.teacher_name} {item.teacher_surname}</a>
                        </div>
                    </div>
                    <button name={'follow'} value={item.id} className="segui" onClick={(e)=>this.buttonFollowClicked(e).bind(this)}>
                        <div>Follow</div>
                    </button>
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