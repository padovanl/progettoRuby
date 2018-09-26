function confermeSubmit(){
    alert("Ricorda che creando questo post, potresti riceve email nella posta usata per la registrazione :)")
}

class AddRep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isValidated: false,
            showError: false,
            modalState: false,
            offer: false, //true = offro, false = cerco
            select_offer: false,
            course: '- Select -',
            competence: '',
            place: '',
            price: '15',
            home_service: null,
            week_days: '',
            description: '',
            selectedRadio: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(){

        const formLength = this.formEl.length;


        if (this.formEl.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                const elem = this.formEl[i];
                const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
                //      console.log("ErrorLabel", errorLabel, "elem.nodeName", elem.nodeName, "validation message: ", elem.validationMessage);
                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                    if (!elem.validity.valid) {
                        errorLabel.textContent = elem.validationMessage;
                    } else {
                        errorLabel.textContent = '';
                    }
                }
            }
            this.setState({isValidated: false});
            //       console.log("Ritorna false il validate")
            return false;
        }
        else{
            for(let i=0; i<formLength; i++) {
                const elem = this.formEl[i];
                const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                    errorLabel.textContent = '';
                }
            }
            //     console.log("Ritorna true il validate")
            return true;
        }
    }



    handleSubmit(event) {
        event.preventDefault();
        if (this.state.course === '- Select -' ) {
            this.setState({showError: true});
            return
        }

        if (!this.validate()){
            return
        }

        confermeSubmit();


        const addNewRep = this.props.addNewRep;

        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        //user_id, course_id, follow=true lo faccio direttamente nel controller (chiamando la funzione dal model)
        const data = new FormData(event.target); // event.target gives you the native DOMNode

        const options = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: (data),
        };

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        const request = new Request('/reps', options);

        fetch(request)
            .then(handleErrors)
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                addNewRep(json)
            })
            .catch(error => console.log(error));

        this.setState({showError: false, isValidated: true});
        this.closeModal();
    }



    handleChange(e, key=null){
        if (e.target.id === 'home_service')
            this.setState({[e.target.id]: !e.target.value});
        else if (e.target.id === 'offer'){
            this.setState({[e.target.id]: e.target.value, select_offer: true, selectedRadio: key});

        }
        else if (e.target.id === 'course')
            this.setState({[e.target.id]: e.target.value, showError: false});
        else
            this.setState({[e.target.id]: e.target.value});//.replace(/[^a-zA-Z0-9-,.();!? ]/g, '')
    }


    closeModal(){
        this.props.closeModal();
        //reset form
        this.setState({
            select_offer: false,
            selectedRadio: null,
            course: "- Select -",
            competence: '',
            place: '',
            price: '15',
            home_service: null,
            week_days: '',
            description: '',
        });
    }


    render() {
        let courseNames = this.props.courseNames.map((course)=>{
            return(
                <option key={course.name}>{course.name}</option>
            )
        });

        let offer;
        if (this.state.offer.toString() === 'false')
            offer = " is-hidden "; //false
        else
            offer = ""; //true

        const error_message= <font color={"red"}>Il campo "Course" non può essere "- Select -" !</font>;

        let myForm;
        if (this.state.select_offer){
            myForm= <div>
                        <div className="field">
                            <label className="label">Course*</label>
                            <div className="control">
                                <div className="select">
                                    <select required  value={this.state.course} name={"rep[course_name]"} id="course" onChange={(e)=>this.handleChange(e)}>
                                        <option key={'- Select -'}>- Select -</option>
                                        {courseNames}
                                    </select>
                                </div>
                            </div>
                            { this.state.showError ? error_message : "" }
                        </div>



                        <div className={"field " + offer}>
                            <label className={"label "}>Competence</label>
                            <div className={"control has-icons-left " }>
                                <div className={"control " }>
                                    <input className="input " type="text" placeholder="Competence "
                                           pattern="[a-zA-Zàèéìòù0-9,.!?()_ -]*"
                                           title={"Sono vietati i caratteri speciali."}
                                           value={this.state.competence} name={"rep[user_competence]"} id={'competence'} onChange={(e) => this.handleChange(e)}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-address-card"/>
                                    </span>
                                    <font className="invalid-feedback" color="red"/>
                                </div>
                            </div>
                        </div>

                        <div className=" field">
                            <label className="label">Price*</label>
                            <div className={"control has-icons-left " }>
                                <input required className="input " type="number" placeholder="Price" maxLength={9}//999999.99=9
                                       min={0} max={9999.99}
                                    title={"Esempio 1: 25.00 / Esempio 2: 10"}
                                       value={this.state.price} name={"rep[price_hours]"} id={'price'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-euro"/>
                                </span>
                                <font className="invalid-feedback" color={"red"} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Place</label>
                            <div className={"control has-icons-left " }>
                                <input className="input " type="text" placeholder="Place"
                                       pattern="[a-zA-Zàèéìòù0-9,.!?()_ -]*"
                                       title={"Sono vietati i caratteri speciali."}
                                       value={this.state.place} name={"rep[place]"} id={'place'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-home"/>
                                </span>
                                <font className="invalid-feedback" color="red"/>
                            </div>
                        </div>


                        <div className="field">
                            <label className="label">Home lesson</label>
                            <div className="control">
                                <label className="radio">
                                    <input type={"radio"} id={"home_service"} name={"rep[home_service]"}
                                           defaultChecked={this.state.home_service===true} value={true} onChange={(e) => this.handleChange(e)}/> Si
                                </label>
                                <label className="radio">
                                    <input type={"radio"} id={"home_service"} name={"rep[home_service]"}
                                           defaultChecked={this.state.home_service===false} value={false} onChange={(e) => this.handleChange(e)}/> No
                                </label>
                            </div>
                        </div>


                        <div className="field">
                            <label className="label">Week days</label>
                            <div className={"control has-icons-left " }>
                                <input className="input " type="text" placeholder="Week days of lessons "
                                       title={"Può contenere solo: lettere virgole punti e spazi"}
                                       pattern="[a-zA-Zàèéìòù,. ]*"
                                       value={this.state.week_days} name={"rep[week_days]"}
                                       id={'week_days'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-calendar-alt"/>
                                </span>
                                <font className="invalid-feedback" color="red"/>
                            </div>
                        </div>


                        <div className="field">
                            <label className="label">Description</label>
                            <div className={"control has-icons-left " }>
                                <input className="input " type="text" placeholder="Description"
                                       pattern="[a-zA-Zàèéìòù0-9,.!?()_ -]*"
                                       title={"Sono vietati i caratteri speciali."}
                                       value={this.state.description} name={"rep[description]"} id={'description'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-pencil-alt"/>
                                </span>
                                <font className="invalid-feedback" color="red" />
                            </div>
                        </div>
                    </div>;
        }

        let classNames = [];

        if (this.state.isValidated) {
            classNames.push('.was-validated');
        }

        return(
            <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create post</p>
                        <button className="delete" aria-label="close"
                                onClick={this.closeModal} />
                    </header>

                <form ref={form => this.formEl = form} onSubmit={ (e) => this.handleSubmit(e) } className={classNames} noValidate>
                    <section className="modal-card-body overflow-modal">

                            <div className="field">
                                <div className="control">
                                    <label className="radio" >
                                        <input key={1} type={"radio"} id={"offer"} name={"rep[offer]"} value={true}
                                               onClick={(e) => this.handleChange(e,1)} checked={this.state.selectedRadio === 1}/> Offro
                                    </label>
                                    <label className="radio"  >
                                        <input key={2} className="left-gap" type={"radio"} id={"offer"} name={"rep[offer]"}
                                               value={false} onClick={(e) => this.handleChange(e,2)} checked={this.state.selectedRadio ===2}/> Cerco
                                    </label>
                                </div>
                            </div>
                            {myForm}
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-rounded is-success" type={"submit"}>Save post</button>
                    </footer>
                </form>

            </div>

        )
    }

}