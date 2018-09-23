class SurveyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followed: '',
        };
    }

    getDataFollowed() {
        let linkGet =  '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.course_id + '.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ followed: data }) });
    }

    followCourse(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch('/follow', { method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data } )
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ followed: [ data ] }) });
    }

    componentDidMount(){
        this.getDataFollowed();
    }

    render(){
        const { course_id } = this.props;

        let follow_id =  this.state.followed.length > 0 && this.state.followed[0].follow ? this.state.followed[0].id : null

        let linkSondaggio = "/api/v1/users/" + this.props.user_id + "/user_courses/" + follow_id + "?course_id="+ this.props.course_id

        let bottone = '';
        if (this.state.followed.length > 0 && !this.state.followed[0].passed) {
            bottone = <a className="button is-rounded is-warning" href={linkSondaggio}>Compila il sondaggio</a>
        } else {
            bottone = <div className="is-size-5 has-text-success"><span>Corso superato </span><i className="fas fa-check"></i></div>
        }

        const link_risorse = <div className="link-resources"><a className="button is-rounded is-warning" href={ '/publications/' + course_id }>Bacheca</a>
                <a className="button is-rounded is-warning" href={ '/resources/' + course_id }>Materiale didattico</a></div>;

        return(
            <div>
                { this.state.followed.length > 0 && this.state.followed[0].follow ? <div>{ link_risorse }{ bottone }</div> :

                    <form onSubmit={ (e) => this.followCourse(e) }>
                        <input className="input" name="user_course[course_id]" type="hidden" value={course_id} />
                        <input className="input" name="user_course[follow]" type="hidden" value="true" />
                        <button className="button is-rounded is-success" type="submit">Segui corso</button>
                    </form>
                }
            </div>
        )
    }

}