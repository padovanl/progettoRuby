class AddRep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseNames: [],
            showError: false,
            modalState: false,
            offer: false, //true = offro, false = cerco
            select_offer: false,
            course: '- Select -',
            competence: '',
            place: '',
            price: '15',
            home_service: false,
            week_days: '',
            description: '',
            controlValue: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        getNames('Course')
            .then(data => {
                this.setState({courseNames: data})
            })
            .catch((e) => console.log(e))
    }


    handleSubmit(event) {
        console.log("CIAOOOOOOOOOOOOO", event.target);
        event.preventDefault();
        if (this.state.course === '- Select -' ) {
            this.setState({showError: true});
            return
        }


        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        //   myHeaders.append('Content-Type', 'application/json');

        //user_id, course_id, follow=true lo faccio direttamente nel controller (chiamando la funzione dal model)
        const data = new FormData(event.target); // event.target gives you the native DOMNode
        console.log("CIAOOOOOOOOOOOOO data", data);

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
            .catch(error => console.log(error));

        this.setState({showError: false});
        this.closeModal();

        document.getElementById("post_attachments").value = null;
    }

    handleChange(e){
        if (e.target.id === 'home_service'){
            this.setState({[e.target.id]: !e.target.value});
        }
        else{
            if (e.target.id === 'offer'){
                this.setState({[e.target.name]: e.target.value, select_offer: true});
                console.log("e.target.value=offer: ",e.target.value)
            }
            this.setState({[e.target.id]: e.target.value});
            console.log("Aggiornamento ",e.target.id + " valore: ", e.target.value)
        }
    }


    closeModal(){
        this.props.closeModal();
        this.setState({offer: false, select_offer: false});
    }


    render() {
        let courseNames = this.state.courseNames.map((course)=>{
            return(
                <option key={course.name}>{course.name}</option>
            )
        });

        let offer;
        if (this.state.offer.toString() === 'false')
            offer = " is-hidden "; //false
        else
            offer = ""; //true

        const error_message= <article className="message is-danger">
                                <div className="message-header red">
                                    <p>Il campo non può essere '- Select -' !</p>
                                </div>
                            </article>;

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
                            <label className={"label" +offer}>Competence</label>
                            <div className={"control has-icons-left " }>
                                <div className={"control " }>
                                    <input className="input " type="text" placeholder="Competence "
                                           value={this.state.competence} name={"rep[user_competence]"} id={'competence'} onChange={(e) => this.handleChange(e)}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-address-card"/>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Price*</label>
                            <div className={"control has-icons-left " }>
                                <input required className="input " type="text" placeholder="Price"
                                       value={this.state.price} name={"rep[price_hours]"} id={'price'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-euro"/>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Place</label>
                        <div className={"control has-icons-left " }>
                            <input className="input " type="text" placeholder="Place"
                                   value={this.state.place} name={"rep[place]"} id={'place'} onChange={(e) => this.handleChange(e)}/>
                            <span className="icon is-small is-left">
                                  <i className="fas fa-home"/>
                            </span>
                        </div>
                        </div>


                        <div className="field">
                            <label className="label">Home lesson</label>
                            <div className="control">
                                <label className="radio">
                                    <input type={"radio"} id={"home_service"} name={"rep[home_service]"} value={true} onClick={(e) => this.handleChange(e)}/> Si
                                </label>
                                <label className="radio">
                                    <input type={"radio"} id={"home_service"} name={"rep[home_service]"} value={false} onClick={(e) => this.handleChange(e)}/> No
                                </label>
                            </div>
                        </div>


                        <div className="field">
                            <label className="label">Week days</label>
                            <div className={"control has-icons-left " }>
                                <input className="input " type="text" placeholder="Week days of lessons "
                                       value={this.state.week_days} name={"rep[week_days]"} id={'week_days'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-calendar-alt"/>
                                </span>
                            </div>
                        </div>


                        <div className="field">
                            <label className="label">Description</label>
                            <div className={"control has-icons-left " }>
                                <input className="input " type="text" placeholder="Description"
                                       value={this.state.description} name={"rep[description]"} id={'description'} onChange={(e) => this.handleChange(e)}/>
                                <span className="icon is-small is-left">
                                      <i className="fas fa-pencil-alt"/>
                                </span>
                            </div>
                        </div>
                    </div>;
        }

        return(
            <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create post</p>
                        <button className="delete" aria-label="close"
                                onClick={this.closeModal} />
                    </header>

                <form onSubmit={ (e) => this.handleSubmit(e) }>
                    <section className="modal-card-body">

                            <div className="field">
                                <div className="control">
                                    <label className="radio">
                                        <input type={"radio"} id={"offer"} name={"rep[offer]"} value={true} onClick={(e) => this.handleChange(e)}/> Offro
                                    </label>
                                    <label>
                                        <input className="left-gap" type={"radio"} id={"offer"} name={"rep[offer]"} value={false} onClick={(e) => this.handleChange(e)}/> Cerco
                                    </label>
                                </div>
                            </div>
                            {myForm}
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success" type={"submit"}>Save post</button>
                        <button className="button" onClick={this.closeModal}>Cancel</button>
                    </footer>
                </form>

            </div>

        )
    }

}