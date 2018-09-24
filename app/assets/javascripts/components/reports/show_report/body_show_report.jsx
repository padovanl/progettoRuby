class BodyShowReport extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            report: {},
        };
    }

    getData1() {
        let linkGet =  '/reports/' + this.props.report_id + '.json';
        fetch(linkGet, { credentials: 'same-origin' })
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ report: data }) });
    }

    componentDidMount(){
        console.log("dentro component didmount")
        this.getData1();
    }


    render(){


        let report_details = this.state.report.course && this.state.report.reportable ? <div><ReportDetails course_details={this.state.report.course}
                                                                            report_details={this.state.report.reportable}
                                                                            report_type={this.state.report.reportable_type}/></div> : <div></div>

        let reporters = this.state.report.user_reports  ? <div><AllShowReporters reporters={this.state.report.user_reports} /></div> : <div></div>


        return(
            <div>
                <div>
                {report_details}
                <br/><br/><br/>
                {reporters}
                </div>
            </div>
        )
    }
}