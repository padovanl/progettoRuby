class AllNotifications extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        let show_more_button;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext){
            show_more_button= <div className='buttonnext' onClick={() => this.props.handleShowMore()}>
                <span> Mostra di più</span> </div>
        }
        else{
            show_more_button=<div className='buttonnext disabled'> Mostra di più</div>;
        }

        var notifications = this.props.notifications.map((notification) => {
            return(
                <Notification key={notification.id} notification={notification} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-centered">
                    <tbody>
                    {notifications}
                    </tbody>
                </table>
                <div>
                    {show_more_button}
                </div>
            </div>
        )
    }

}