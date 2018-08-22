class NotificationsNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }




    getCountNew(){
        fetch('/api/v1/new_notifications.json')
            .then((response) => {return response.json()})
            .then((data) => { this.setState({count: data})});
    }



    render(){
        let style = {
            margin: 8,
        };
        //this.getCountNew();
        return(
            <div style={style}>
                <a className="navbar-item" href="/notifications">
                    <span className="badge is-badge-primary bd-emoji" data-badge="1"><i className="fas fa-globe-americas"></i></span>
                </a>
            </div>

        )
    }
}