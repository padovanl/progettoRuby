class BodyTip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tips: [],
            followed: this.props.details_follow_course,
            show_details: false,
            content_tip: '',
            modalIsActive: false,
            linkReport: ''

        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTipCourse = this.addNewTipCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteCourseTip = this.deleteCourseTip.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateCourseTip = this.updateCourseTip.bind(this)
        this.handleShowDetails = this.handleShowDetails.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.activeModal = this.activeModal.bind(this)


    }

    handleChange(event) {
        this.setState({content_tip: event.target.value});
    }

    handleShowDetails(){
        this.setState({show_details: !this.state.show_details});
    }

    getData1() {
        let linkGet =  '/courses/' + this.props.course_id + '/course_tips';
        fetch(linkGet, {credentials: "same-origin"})
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ tips: data }) });
    }


    componentDidMount(){
        this.getData1();
    }

    handleFormSubmit(course_id, user_id, tip_text) {
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let body = JSON.stringify({courseTip: {course_id: course_id, user_id: user_id, tip: tip_text}});
        let linkNew = '/courses/' + this.props.course_id + '/course_tips';
        if (tip_text != '') {
            fetch(linkNew, {
                method: 'POST',
                headers: myHeaders,
                body: body,
                credentials: "same-origin"
            }).then((response) => {
                return response.json()
            })
                .then((courseTip) => {
                    if (courseTip.error) {
                        alert("Errore!")
                    } else {
                        this.addNewTipCourse(courseTip);
                        this.setState({
                            content_tip: ''
                        })
                    }

                })
        } else {
            alert('Il campo non può essere vuoto')
        }
    }

    addNewTipCourse(tipCourse){
        this.setState({
            tips: this.state.tips.concat(tipCourse)
        })
    }

    handleDelete(id){
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let linkDelete = '/courses/' + this.props.course_id + '/course_tips/' + id
        if(confirm('Sei sicuro di voler eliminare questa domanda?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    credentials: "same-origin"
                }).then((response) => {
                if (response.ok){
                    this.deleteCourseTip(id)
                }else{
                    alert("errore")
                }
            })
        }

    }

    deleteCourseTip(id){
        let newCourseTip = this.state.tips.filter((f) => f.id !== id)
        this.setState({tips: newCourseTip})
    }

    handleUpdate(tip_text, id){
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let body = JSON.stringify({courseTip: {tip: tip_text}});
        let linkUpdate = '/courses/' + this.props.course_id + '/course_tips/' + id
        if(confirm('Sei sicuro di voler modificare questa domanda?')) {
            if (tip_text != '') {
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        body: body,
                        headers: myHeaders
                    }).then((response) => {
                    return response.json()
                })
                    .then((courseTip) => {
                        if (courseTip.error) {
                            alert("Errore!")
                        } else {
                            this.updateCourseTip(courseTip);
                        }

                    })
            } else {
                alert("I campi non possono essere vuoti!")
            }
        }
    }

    updateCourseTip(courseTip){
        let newCourseTip = this.state.tips.filter((f) => f.id !== courseTip.id)
        newCourseTip.push(courseTip)
        this.setState({
            tips: newCourseTip
        })
    }

    activeModal(link){
        this.setState({modalIsActive: true})
        this.setState({linkReport: link})
    }

    disableModal() {
        this.setState({modalIsActive: false});
    }



    render(){

        const n_your_tips = this.state.tips.filter((q) => q.user_id == this.props.current_user.id).length;

        const gestisci_i_tuoi_tips_button = (this.state.tips.length && n_your_tips > 0) || this.props.current_user.admin ? <a className="button is-rounded is-warning" onClick={ () => this.handleShowDetails()}>Gestisci i tuoi suggerimenti</a> : null;

        return(
            <div>
                { this.state.followed && this.state.followed.passed || this.props.current_user.admin ? <div className="has-text-left link-resources"> {gestisci_i_tuoi_tips_button}</div> : null}
                <AllTips tips={this.state.tips}
                              course_id={this.props.course_id}
                              current_user={this.props.current_user}
                              handleDelete={this.handleDelete}
                              handleUpdate = {this.handleUpdate}
                              show_details = {this.state.show_details}
                              activeModal={this.activeModal} />
                <br/>
                <table className="table is-fullwidth">
                    <tbody>
                    { this.state.followed && this.state.followed.passed ?
                        <NewTipCourse course_id={this.props.course_id}
                                      current_user={this.props.current_user}
                                      handleFormSubmit={this.handleFormSubmit}
                                      content_tip={this.state.content_tip}
                                      handleChange={this.handleChange} /> : null}
                    </tbody>
                </table>
                <div className={"modal " + (this.state.modalIsActive ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.disableModal.bind(this)} />

                    <ReportModal  linkReport={this.state.linkReport}
                                  disableModal={this.disableModal.bind(this)} title={"Segnalazione suggerimento"}/>

                    <button className="modal-close is-large" aria-label="close"
                            onClick={this.disableModal.bind(this)} />
                </div>
            </div>
        )
    }
}