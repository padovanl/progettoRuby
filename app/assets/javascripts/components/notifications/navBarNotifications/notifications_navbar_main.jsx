class NotificationsNavBarMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: "0",
            notifications: []
        };
    }

    getDataNotifications() {
        let linkGet =  '/notifications_nav_bar.json';
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ notifications: data }) });
    }

    getDataCountNotifications(){
        fetch('/new_notifications.json')
            .then((response) => {return response.json()})
            .then((data) => { this.setState({num: data})});
    }
    componentDidMount(){
        this.getDataCountNotifications();
        this.getDataNotifications();
    }

    handleUpdateIsSelected(){
        let linkUpdate = '/update_is_selected';
        fetch(linkUpdate,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            return response.json()
        })
            .then((notification) => {
                if (notification.error) {
                    alert("Errore!")
                } else {
                    this.getDataCountNotifications();
                }
            })
    }

    render(){
        let style = {
            marginTop: 10,
            marginRight: 5,
        };

        //this.getCountNew();
        //this.getCountNew();
        return(
            <div style={style}>
                <div className="navbar-item has-dropdown is-hoverable">
                    <div className="navbar-link" onMouseOver={() => this.handleUpdateIsSelected()}>
                        <span className="badge is-badge-primary bd-emoji" data-badge={this.state.num}><i className="fas fa-globe-americas"></i></span>
                    </div>
                    <AllNotificationsNavBar notifications={this.state.notifications}/>
                </div>
            </div>
        )
    }
}