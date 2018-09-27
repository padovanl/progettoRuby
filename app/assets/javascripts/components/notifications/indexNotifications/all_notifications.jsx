class AllNotifications extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var scroolStyle = {
            overflowX: "auto",
        };

        let show_more_button;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext){
            show_more_button= <a className="button is-link is-rounded" onClick={() => this.props.handleShowMore()}>
                <span> Mostra di più</span> </a>
        }
        else{
            show_more_button=<a className='button is-link is-rounded disabled'>Mostra di più</a>;
        }

        var notifications = this.props.notifications.map((notification) => {
            return(
                <Notification key={notification.id} notification={notification} handleMarkAndRedirect={this.props.handleMarkAndRedirect} />
            )
        })

        return(
            <div>
                <div className="columns">
                    <div className="column is-1"></div>
                    {notifications.length ? <div className="column" style={scroolStyle}>
                        <table className="table is-hoverable is-fullwidth">
                            <tbody>
                            {notifications}
                            </tbody>
                        </table>
                    </div> :  <div> Nessuna notifica presente </div>}
                        <div className="column is-1"></div>
                </div>


                <div className="columns">
                    <div className="column is-1"></div>
                    {notifications.length ? <div className="column" style={scroolStyle}>
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