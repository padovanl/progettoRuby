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

    componentDidMount(){
        this.getDataFollowed();
    }

    render(){
        let pulsante;
        let linkSondaggio = "/api/v1/users/" + this.props.user_id + "/user_courses"

        if(this.state.followed.length > 0 && !this.state.followed[0].passed){
            bottone = <a className="button is-rounded is-warning" href={linkSondaggio}>Compila il sondaggio</a>
        }else{
            bottone = <div className="has-text-success"><span>Questionario Compilato </span><i className="fas fa-check"></i></div>;
        }

        return(
            <div>
                { this.state.followed.length > 0 && this.state.followed[0].follow ? <div>{bottone}</div> : null}
            </div>
        )
    }
}