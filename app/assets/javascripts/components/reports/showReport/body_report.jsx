class BodyReport extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            report: {},
        };

    }

    componentDidMount(){
        this.getReportDetails();
    }

    getReportDetails(){
        let linkGet =  '/reports/' + this.props.report_id + '.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({report: data })
            });
    }

    render(){
        return(
            <div>
                <ReportDetails report_details={this.state.report.reportable}
                               course_details={this.state.report.course}
                               report_type={this.state.report.reportable_type} />
                <Reporters reporters={this.state.report.user_reports} />
                {console.log(this.state.report.course.name)}
            </div>
        )
    }
}