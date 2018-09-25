class AllNotificationsNavBar extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){

        let style_margin_top = {
            marginTop: 2
        };

        var notifications = this.props.notifications.map((notification) => {
                return(
                    <NotificationNavbar notification={notification} />
                )
            })


        return(
            <div>
                <div className="navbar-dropdown is-hidden-mobile" style={style_margin_top}>
                    {notifications}
                    <hr className="navbar-divider" />
                    <a className="navbar-item is-active show-all has-text-weight-bold" href="/notifications">
                        Mostra tutte
                    </a>
                </div>
            </div>
        )
    }
}