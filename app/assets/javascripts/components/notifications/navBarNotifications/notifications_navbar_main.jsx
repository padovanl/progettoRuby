class NotificationsNavBarMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: "0",
            notifications: [],
            isActive: "navbar-item has-dropdown"
        };
    }

    getDataNotifications() {
        let linkGet =  '/notifications_nav_bar.json';
        fetch(linkGet, {
            credentials: 'same-origin'
        })
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ notifications: data }) });
    }

    getDataCountNotifications(){
        fetch('/new_notifications.json', {
            credentials: 'same-origin'
        })
            .then((response) => {return response.json()})
            .then((data) => {
                this.setState({num: data})
            });
    }

    updateCountNotifications(notification){
        this.setState({num: notification.length})
    }



    componentDidMount(){
        this.getDataCountNotifications();
        this.getDataNotifications();
    }

    handleUpdateIsSelected(){

        if (this.state.isActive == "navbar-item has-dropdown"){
            this.setState({isActive: "navbar-item has-dropdown is-active"})
            if (this.state.num > 0){
                let linkUpdate = '/update_is_selected_notification';
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
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
        }else{
            this.setState({isActive: "navbar-item has-dropdown"})
        }
    }

    render(){

        return(
            <div className="navbar-item">
                <NotificationsWebSocket data-updateApp={ this.updateCountNotifications.bind(this)} />
                <div className={this.state.isActive}>
                    <a className="navbar-link" onClick={() => this.handleUpdateIsSelected()}>
                        <span className="badge is-badge-primary bd-emoji" data-badge={this.state.num}><i className="fas fa-globe-americas"></i></span>
                    </a>
                    <AllNotificationsNavBar notifications={this.state.notifications}/>
                </div>
            </div>
        )
    }
}