class AllShowReporters extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var reporters = this.props.reporters.map((reporter) => {
            return(
                <Reporter key={reporter.id} reporter={reporter} />
            )
        })


        return(
            <div className="columns">
                <div className="column is-3"></div>
                <div className="column">
                    <h3 className="title is-5">Chi ha segnalato</h3>
                    <table className="table is-hoverable is-narrow is-centered is-fullwidth">
                        <thead>
                        <tr>
                            <th>Utente</th>
                            <th>Motivazione</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reporters}
                        </tbody>
                    </table>
                </div>
                <div className="column is-3"></div>
            </div>
        )
    }

}