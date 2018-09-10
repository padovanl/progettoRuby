class BodySurvey extends React.Component {

    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.updateCourseQuestion = this.updateCourseQuestion.bind(this)

    }

    handleFormSubmit(course_rate, material_quality, explanation, average_attempts, average_days) {
        let body = JSON.stringify({userCourses: {course_rate: course_rate,
                material_quality: material_quality,
                explanation: explanation,
                average_attempts: average_attempts,
                average_days: average_days,
                passed: true}});
        // /api/v1/users/:user_id/user_courses/:id(.:format)
        let linkUpdate = '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.user_courses_id
        if(confirm('Sei sicuro di voler confermare il questionario?')) {
            if (average_attempts != '' || average_days != '') {
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        body: body,
                        headers: {
                            'Content-Type': 'application/json'
                        }
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
        console.log("Update avvenuto con successo")
    }




    render(){

        let formFields = {};
        //elenco di voti da 18 a 31
        var voteList = [];
        for (var i = 18; i <= 31; i++) {
            voteList.push(i);
        }

        //array associativo con 1 - insufficiente -> 4 - buono
        var lista_giudizi = ['insufficiente', 'sufficiente','discreto','buono','molto buono' ];

// course rate sarebbe il voto conseguito

        return(
            <div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
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
                        <div className="field-label is-normal">
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
                        <div className="field-label is-normal">
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
                                    <input className="input" type="number" ref={input => formFields.average_attempts = input} />
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Giorni di studio</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                    <input className="input" type="number" ref={input => formFields.average_days = input} />
                            </div>
                        </div>
                    </div>
                <div>
                    <br/>
                    <a className="button is-rounded is-link" onClick={ () => this.handleFormSubmit(
                        formFields.course_rate.value,
                        formFields.material_quality.value,
                        formFields.explanation.value,
                        formFields.average_attempts.value,
                        formFields.average_days.value)}>Conferma questionario</a>
                </div>
            </div>
        )
    }
}