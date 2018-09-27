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
            <div>
                <div className="columns">
                    <div className="column is-1"></div>
                    {reports.length ? <div className="column" style={scroolStyle}>
                        <table className="table is-hoverable is-fullwidth">
                            <tbody>
                            {reports}
                            </tbody>
                        </table>
                    </div> :  <div className="column"><div className="is-fullwidth has-text-centered has-text-weight-bold"> Nessun report presente </div></div>}
                    <div className="column is-1"></div>
                </div>


                <div className="columns">
                    <div className="column is-1"></div>
                    {reports.length ? <div className="column" style={scroolStyle}>
                        <table className="table is-fullwidth">
                            <thead>
                            <tr>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <div className="has-text-centered">
                                <br/>
                                {show_more_button}
                            </div>
                            </tbody>
                        </table>
                    </div> :  null}
                    <div className="column is-1"></div>
                </div>
            </div>
        )
    }

}