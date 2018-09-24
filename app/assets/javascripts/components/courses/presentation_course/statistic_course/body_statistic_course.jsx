class BodyStatisticCourse extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                {this.props.statistic_values != null ? <AllStatisticCourse statistic_values={this.props.statistic_values} /> : <div>Nessun sondaggio è stato ancora complilato</div>}
            </div>
        )
    }
}