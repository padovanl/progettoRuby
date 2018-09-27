class AllNotificationsNavBar extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){

        let style_margin_top = {
            marginTop: 1,
            width: 350
        };

        var notifications = this.props.notifications.map((notification) => {
                return(
                    <NotificationNavbar notification={notification} />
                )
            })


        return(
            <div>
                <div className="navbar-dropdown is-hidden-touch" style={style_margin_top}>
                    {notifications.length ? <div>{notifications}</div> : <div className="has-text-centered"> Nessuna notifica da leggere </div>}
                    <hr className="navbar-divider" />
                    <a className="navbar-item is-active show-all has-text-weight-bold" href="/notifications">
                        Mostra tutte
                    </a>
                </div>
            </div>
        )
    }
}