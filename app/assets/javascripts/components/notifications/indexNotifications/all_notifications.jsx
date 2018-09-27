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
            <div className="columns">
                <div className="column is-1"></div>
                {notifications.length ? <div className="column" style={scroolStyle}>
                    <table className="table is-hoverable is-fullwidth">
                        <thead>
                        <tr>
                            <th className='notification-icon-column'></th>
                            <th className="notification-text-column"></th>
                            <th className='notification-icon-column'></th>
                            <th className='notification-time-column'></th>
                            <th className='notification-icon-column'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {notifications}
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
                </div> :  <div> Nessuna notifica presente </div>}
                <div className="column is-1"></div>
            </div>
        )
    }

}