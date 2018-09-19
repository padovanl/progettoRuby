class AllNotifications extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

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
                <div className="column">
                    <table className="table is-hoverable is-narrow is-centered is-fullwidth">
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
                </div>
                <div className="column is-1"></div>
            </div>
        )
    }

}