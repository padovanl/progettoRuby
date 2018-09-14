class BodyStatisticCourse extends React.Component {

    constructor(props) {
        super(props);
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
                <AllStatisticCourse statistic_values={this.props.statistic_values} />
            </div>
        )
    }
}