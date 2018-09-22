class BodyTip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tips: [],
            followed: '',
            show_details: false,
            content_tip: ''

        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTipCourse = this.addNewTipCourse.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteCourseTip = this.deleteCourseTip.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateCourseTip = this.updateCourseTip.bind(this)
        this.handleShowDetails = this.handleShowDetails.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({content_tip: event.target.value});
    }

    handleShowDetails(){
        this.setState({show_details: !this.state.show_details});
    }

    getData1() {
        let linkGet =  '/courses/' + this.props.course_id + '/course_tips';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ tips: data }) });
    }

    getData2() {
        let linkGet =  '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.course_id + '.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ followed: data }) });
    }

    componentDidMount(){
        this.getData1();
        this.getData2();
    }

    handleFormSubmit(course_id, user_id, tip_text) {
        let body = JSON.stringify({courseTip: {course_id: course_id, user_id: user_id, tip: tip_text}});
        let linkNew = '/courses/' + this.props.course_id + '/course_tips';
        if (tip_text != '') {
            fetch(linkNew, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
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
        let linkDelete = '/courses/' + this.props.course_id + '/course_tips/' + id
        if(confirm('Sei sicuro di voler eliminare questa domanda?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
        let body = JSON.stringify({courseTip: {tip: tip_text}});
        let linkUpdate = '/courses/' + this.props.course_id + '/course_tips/' + id
        if(confirm('Sei sicuro di voler modificare questa domanda?')) {
            if (tip_text != '') {
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        body: body,
                        headers: {
                            'Content-Type': 'application/json'
                        }
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
        console.log(courseTip)
        let newCourseTip = this.state.tips.filter((f) => f.id !== courseTip.id)
        console.log(newCourseTip)
        newCourseTip.push(courseTip)
        console.log("sono dopo la push")
        this.setState({
            tips: newCourseTip
        })
    }



    render(){
        //console.log(this.state.followed.length > 0 ? this.state.followed[0].passed : 'Items not loaded yet');        //this.state.tubedata.length > 0 && this.state.tubedata[0].id

        const gestisci_i_tuoi_tips_button = <td><a className="button is-rounded is-warning" onClick={ () => this.handleShowDetails()}>Gestisci i tuoi suggerimenti</a></td>;

        return(
            <div>
                { this.state.followed.length > 0 && this.state.followed[0].passed ? <table className="table"><tbody><tr>{gestisci_i_tuoi_tips_button}</tr></tbody></table> : null}
                <AllTips tips={this.state.tips}
                              course_id={this.props.course_id}
                              user_id={this.props.user_id}
                              handleDelete={this.handleDelete}
                              handleUpdate = {this.handleUpdate}
                              show_details = {this.state.show_details} />
                <br/>
                <table className="table is-fullwidth">
                    <tbody>
                    { this.state.followed.length > 0 && this.state.followed[0].passed ?
                        <NewTipCourse course_id={this.props.course_id}
                                      user_id={this.props.user_id}
                                      handleFormSubmit={this.handleFormSubmit}
                                      content_tip={this.state.content_tip}
                                      handleChange={this.handleChange} /> : null}
                    </tbody>
                </table>
            </div>
        )
    }
}