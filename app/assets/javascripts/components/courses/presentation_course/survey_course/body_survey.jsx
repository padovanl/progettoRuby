class BodySurvey extends React.Component {

    constructor(props){
        super(props);
        this.state = {value_number_attempts: '',
                      value_number_days: ''
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.updateCourseQuestion = this.updateCourseQuestion.bind(this)
        this.onChangeAttempts = this.onChangeAttempts.bind(this)
        this.onChangeDays = this.onChangeDays.bind(this)


    }

    handleFormSubmit(course_rate, material_quality, explanation, average_attempts, average_days) {
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let body = JSON.stringify({userCourses: {course_rate: course_rate,
                material_quality: material_quality,
                explanation: explanation,
                average_attempts: average_attempts,
                average_days: average_days,
                passed: true}});
        // /api/v1/users/:user_id/user_courses/:id(.:format)
        let linkUpdate = '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.user_courses_id
        if(confirm('Sei sicuro di voler confermare il questionario?')) {
            if (average_attempts != '' && average_days != '') {
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        body: body,
                        headers: myHeaders
                    }).then((response) => {
                    return response.json()
                })
                    .then((courseQuestion) => {
                        if (courseQuestion.error) {
                            alert("Errore!")
                        } else {
                            this.updateCourseQuestion();
                            
                        }

                    })
            } else {
                alert("I campi non possono essere vuoti!")
            }
        }
    }

    updateCourseQuestion(){
        window.location.href = "/courses/" + this.props.course_id
        toastr.success("survey_course compilato con successo")
    }

    onChangeAttempts(evt) {
        const re = /^[0-9\b]+$/;
        if (evt.target.value == '' || re.test(evt.target.value)) {
            this.setState({value_number_attempts: evt.target.value});
        }
    }

    onChangeDays(evt) {
        const re = /^[0-9\b]+$/;
        if (evt.target.value == '' || re.test(evt.target.value)) {
            this.setState({value_number_days: evt.target.value});
        }
    }

    render(){

        let formFields = {};
        //elenco di voti da 18 a 31
        var voteList = [];
        for (var i = 18; i <= 31; i++) {
            voteList.push(i);
        }

        var lista_giudizi = ['insufficiente', 'sufficiente','discreto','buono','molto buono' ];

// course rate sarebbe il voto conseguito

        return(
            <div className="columns is-centered">
                <div className="column is-6"></div>
                <div className="column is-four-fifths">
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Voto conseguito</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-narrow">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select ref={input => formFields.course_rate = input}>
                                        {voteList.map(function(vote){
                                            return <option value={vote}>{vote}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">Qualità del materiale fornito</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-narrow">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select ref={input => formFields.material_quality = input}>
                                            {lista_giudizi.map(function(giudizio, i){
                                                return <option value={i+1}>{giudizio}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">Chiarezza nella spiegazione</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-narrow">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select ref={input => formFields.explanation = input}>
                                            {lista_giudizi.map(function(giudizio, i){
                                                return <option value={i+1}>{giudizio}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">Numero di tentativi</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                    <input className="input dimension-survey-10"
                                           type="text"
                                           value={this.state.value_number_attempts}
                                           onChange={this.onChangeAttempts}/>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">Giorni di studio</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                    <input className="input dimension-survey-10" type="text" value={this.state.value_number_days} onChange={this.onChangeDays}  />
                            </div>
                        </div>
                    </div>
                <div>
                    <br/>
                    <a className="button is-rounded is-link" onClick={ () => this.handleFormSubmit(
                        formFields.course_rate.value,
                        formFields.material_quality.value,
                        formFields.explanation.value,
                        this.state.value_number_attempts,
                        this.state.value_number_days)}>Conferma questionario</a>
                    <span> </span>
                    <a className="button is-rounded is-danger" href={"/courses/" + this.props.course_id}>Indietro</a>
                </div>
                </div>
                <div className="column"></div>
            </div>
        )
    }
}