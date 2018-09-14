class MainStatisticCourse extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BodyStatisticCourse statistic_values={this.props.statistic_values}/>
            </div>
        )
    }
}