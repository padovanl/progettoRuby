class SurveyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followed: '',
        };
    }

    getDataFollowed() {
        let linkGet =  '/api/v1/users/' + this.props.user_id + '/user_courses/' + this.props.course_id + '.json';
        fetch(linkGet, { credentials: 'same-origin' })
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
            .then((data) => {
                let followed = {...this.state.followed}    //creating copy of object
                followed.id = data.id;
                followed.follow = true;
                this.setState({followed})
            });
        //this.setState({...this.state.followed, follow: true})
    }

    unfollowCourse(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch('/unfollow', { method: 'PUT',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data } )
            .then((response) => {return response.json()});

        //this.setState({...this.state.followed.follow, follow: false})
        let followed = {...this.state.followed}    //creating copy of object
        followed.follow = false;                        //updating value
        this.setState({followed});
    }

    componentDidMount(){
        this.getDataFollowed();
    }

    render(){
        console.log(this.state.followed)
        let style = {
            marginRight: 2
        };

        const { course_id, user_id } = this.props;
        const follow_id = this.state.followed && this.state.followed.follow ? this.state.followed.id : null
        console.log(follow_id)
        const linkSondaggio = "/course/" + course_id + "/survey/" + follow_id

        let bottone = this.state.followed != null && !this.state.followed.passed ? <a className="button is-rounded is-warning" href={linkSondaggio}>Compila il sondaggio</a> :
            <div className="is-size-5 has-text-success"><span>Corso superato </span><i className="fas fa-check"></i></div>

        const link_risorse = <div className="link-resources"><a className="button is-rounded is-link" href={ '/publications/' + course_id }>Bacheca</a> <span> </span>
                <a className="button is-rounded is-link" href={ '/resources/' + course_id }>Materiale didattico</a></div>;

         const unfollowButton = <form onSubmit={ (e) => this.unfollowCourse(e) }>
             <input className="input" name="user_course[course_id]" type="hidden" value={course_id} />
             <span></span>
             <input className="input" name="user_course[follow]" type="hidden" value="false" />
             <button className="button is-rounded is-danger" type="submit">Smetti di seguire</button>
         </form>

        return(
            <div>
                { this.state.followed  && this.state.followed.follow ? <div>{unfollowButton} <br/> { link_risorse }{ bottone }</div> :

                    <form onSubmit={ (e) => this.followCourse(e) }>
                        <input className="input" name="user_course[course_id]" type="hidden" value={course_id} />
                        <span></span>
                        <input className="input" name="user_course[follow]" type="hidden" value="true" />
                        <button className="button is-rounded is-success" type="submit">Segui corso</button>
                    </form>
                }
            </div>
        )
    }

}