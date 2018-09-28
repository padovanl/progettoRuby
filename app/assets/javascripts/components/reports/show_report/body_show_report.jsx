class BodyShowReport extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            report: {},
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    getData1() {
        let linkGet =  '/reports/' + this.props.report_id + '.json';
        fetch(linkGet, { credentials: 'same-origin' })
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ report: data }) });
    }

    componentDidMount(){
        this.getData1();
    }

    handleDelete(url){
        console.log(url)
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        if(confirm('Sei sicuro di voler eliminare l\' oggetto segnalato?')){
            fetch(url,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    credentials: "same-origin"
                }).then((response) => {
                if (response.ok){
                    window.location.href = "/reports"
                }else{
                    alert("errore")
                }
            })
        }
    }

    render(){


        let report_details = this.state.report.course && this.state.report.reportable ? <div><ReportDetails course_details={this.state.report.course}
                                                                            report_details={this.state.report.reportable}
                                                                            report_type={this.state.report.reportable_type}/></div> : <div></div>

        let reporters = this.state.report.user_reports  ? <div><AllShowReporters reporters={this.state.report.user_reports} /></div> : <div></div>

        let button_delete = this.state.report ? <ButtonDelete handleDelete = {this.handleDelete} report = {this.state.report} /> : <div></div>;

        return(
            <div>
                {button_delete}
                <div>
                    {report_details}
                    <br/><br/><br/>
                    {reporters}
                </div>
            </div>
        )
    }
}