class AllReports extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        let show_more_button;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext){
            show_more_button= <a className="button is-link is-rounded" onClick={() => this.props.handleShowMore()}>
                <span> Mostra di più </span> </a>
        }
        else{
            show_more_button=<a className='button is-link is-rounded disabled'>Mostra di più</a>;
        }

        var reports = this.props.reports.map((report) => {
            return(
                <Report key={report.id}
                        report={report}
                        handleMarkAndRedirect={this.props.handleMarkAndRedirect}
                        handleDelete={this.props.handleDelete} />
            )
        })

        var scroolStyle = {
            overflowX: "auto",
        };

        return(
            <div className="columns">
                <div className="column is-1"></div>
                {reports.length ? <div className="column" style={scroolStyle}>
                    <table className="table is-hoverable is-narrow is-centered is-fullwidth">
                        <tbody>
                        {reports}
                        </tbody>
                    </table>
                    <table className="table is-striped is-centered is-fullwidth">
                        <thead>
                        <tr>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <p className="has-text-centered">
                                {show_more_button}
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div> :  <div> Nessun report presente </div>}
                <div className="column is-1"></div>
            </div>
        )
    }

}