class BodyStatisticCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statistic: '',
        };
    }

    getStatisticData() {
        /*let linkGet =  '/courses/' + this.props.course_id + '/course_tips';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ statistic: data }) });*/
    }

    render(){
        return(
            <div>
                <AllStatisticCourse course_id={this.props.course_id} user_id={this.props.user_id} />
            </div>
        )
    }
}