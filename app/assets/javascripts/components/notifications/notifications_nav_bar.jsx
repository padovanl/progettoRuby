class NotificationsNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp: 0
        };
        //this.temp = ''
    }




    componentDidMount(){
        fetch('/api/v1/new_notifications.json')
            .then((response) => {return response.json()})
            .then((data) => { this.setState({temp: data})});
    }



    render(){
        let style = {
            margin: 8,
        };

        //this.getCountNew();
        //this.getCountNew();
        return(
            <div style={style}>
                <a className="navbar-item" href="/notifications">
                    <span className="badge is-badge-primary bd-emoji" data-badge={this.state.temp}><i className="fas fa-globe-americas"></i></span>
                </a>
            </div>

        )
    }
}