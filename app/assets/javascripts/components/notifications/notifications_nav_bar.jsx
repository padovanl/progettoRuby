class NotificationsNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: "0"
        };
        //this.temp = ''
    }

    componentDidMount(){
        fetch('/new_notifications.json')
            .then((response) => {return response.json()})
            .then((data) => { this.setState({num: data})});
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
                    <a className="navbar-link  " href="#">
                        <span className="badge is-badge-primary bd-emoji" data-badge={this.state.num}><i className="fas fa-globe-americas"></i></span>
                    </a>
                    <div className="navbar-dropdown ">
                        <a className="navbar-item">
                            Dashboard
                        </a>
                        <a className="navbar-item ">
                            Mailing list
                        </a>
                        <a className="navbar-item " href="#">
                            Segnalazioni
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}