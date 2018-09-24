class UpdateRep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRadio: this.props.offer ? 1 : 2,
            offer: this.props.offer,
            isValidated: false,
            modalState: false,
            title: this.props.title,
            course: this.props.course,
            competence: this.props.competence,
            place: this.props.place,
            price: this.props.price,
            home_service: this.props.home_service,
            week_days: this.props.week_days,
            description: this.props.description
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validate = this.validate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }


    validate(){
        console.log("SOno in validate");

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


    handleUpdate(event, id) {
        event.preventDefault();
        if (this.state.course === '- Select -' ) {
            this.setState({showError: true});
            return
        }

        if (!this.validate()){
            return
        }

        const updateRep = this.props.updateRep;

        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        //   myHeaders.append('Content-Type', 'application/json');

        //user_id, course_id, follow=true lo faccio direttamente nel controller (chiamando la funzione dal model)
        const data = new FormData(event.target); // event.target gives you the native DOMNode

        const options = {
            method: 'PATCH',
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

        const request = new Request('/reps/'+id, options);

        fetch(request)
            .then(handleErrors)
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                updateRep(json,id)
            })
            .catch(error => console.log(error));

        this.setState({showError: false, isValidated: true});
        this.closeModal();

        //  document.getElementById("offer").value = null;
    }

    handleChange(e, key=null){
        if (e.target.id === 'home_service')
            this.setState({[e.target.id]: !e.target.value});
        else if (e.target.id === 'offer')
            this.setState({[e.target.id]: e.target.value, select_offer: true, selectedRadio: key});

        else if (e.target.id === 'course')
            this.setState({[e.target.id]: e.target.value, showError: false});
        else
            this.setState({[e.target.id]: e.target.value});
    }

    showModal(){
        this.setState((prev, props) => {
            const newState = !prev.modalState;
            return { modalState: newState };
        });
    }


    closeModal(){
        this.setState({modalState: false});
        //reset form che dovrei fare nel figlio update
    }

    render(){
        let courseNames = this.props.courseNames.map((course)=>{
            return(
                <option key={course.name}>{course.name}</option>
            )
        });

        let classNames = [];

        if (this.state.isValidated) {
            classNames.push('.was-validated');
            console.log("pushato .was-validated")
        }

        let offer;
        if (this.state.offer.toString() === 'false')
            offer = " is-hidden "; //false
        else
            offer = ""; //true

        return(
            <section>
                <a onClick={this.showModal}> <i title="Modifying" className="fas fa-pen"/> </a>

                <div className={"modal " + (this.state.modalState ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.closeModal} />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Update post: {this.props.title}</p>
                            <button className="delete" aria-label="close" onClick={this.closeModal} />
                        </header>

                        <form ref={form => this.formEl = form} onSubmit={ (e) => this.handleUpdate(e, this.props.id) } className={classNames} noValidate>
                            <section className="modal-card-body overflow-modal">

                                <div className="field">
                                    <div className="control">
                                        <label className="radio" >
                                            <input key={1} type={"radio"} id={"offer"} name={"rep[offer]"} value={true}
                                                   onClick={(e) => this.handleChange(e,1)} defaultChecked={this.state.selectedRadio === 1}/> Offro
                                        </label>
                                        <label className="radio"  >
                                            <input key={2} className="left-gap" type={"radio"} id={"offer"} name={"rep[offer]"}
                                                   value={false} onClick={(e) => this.handleChange(e,2)} defaultChecked={this.state.selectedRadio ===2}/> Cerco
                                        </label>
                                    </div>
                                </div>

                                <div className={"field "}>
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
                                                   pattern="[a-zA-Zàèéìòù,.!'?()_ -]*"
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
                                        <input required className="input " type="number" placeholder="Price" maxLength={10}//999.999,99=10
                                               min={0} max={9999.99}
                                               title={"Esempio 1: 25,00 - Esempio 2: 10"}
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
                                               pattern="[a-zA-Zàèéìòù,.!'?()_ -]*"
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
                                                   defaultChecked={this.state.home_service ===true} value={true} onChange={(e) => this.handleChange(e)}/> Si
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
                                               title={"Può contenere solo: lettere , . "}
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
                                               pattern="[a-zA-Zàèéìòù,.!'?()_ -]*"
                                               title={"Sono vietati i caratteri speciali."}
                                               value={this.state.description} name={"rep[description]"} id={'description'} onChange={(e) => this.handleChange(e)}/>
                                        <span className="icon is-small is-left">
                                      <i className="fas fa-pencil-alt"/>
                                </span>
                                        <font className="invalid-feedback" color="red" />
                                    </div>
                                </div>
                            </section>

                            <footer className="modal-card-foot">
                                <button className="button is-success" type={"submit"}>Save post</button>
                                <button className="button" onClick={this.closeModal}>Cancel</button>
                            </footer>
                        </form>

                    </div>
                </div>
            </section>
        )
    }

}


