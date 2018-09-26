class ReportsNavbarMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: "0",
        };
    }

    getDataCountNotifications(){
        fetch('/new_reports.json', {
            credentials: 'same-origin'
        })
            .then((response) => {return response.json()})
            .then((data) => { this.setState({num: data})});
    }
    componentDidMount(){
        this.getDataCountNotifications();
    }

    handleUpdateIsSelected(){
            if (this.state.num > 0){
                var myHeaders = new Headers();
                myHeaders.append('X-CSRF-Token', Rails.csrfToken());
                myHeaders.append('Content-Type', 'application/json');
                let linkUpdate = '/update_is_selected_report';
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        headers: myHeaders
                    }).then((response) => {
                    return response.json()
                })
                    .then((report) => {
                        if (report.error) {
                            alert("Errore!")
                        } else {
                        }
                    })
            }
    }

    render(){

        let style = {
            paddingTop: 2,
            paddingRight: 10
        };

        return(
            <div>
            <a className="navbar-item" onClick={() => this.handleUpdateIsSelected()} href="/reports">
                <span className="badge is-badge-primary bd-emoji is-badge-right" data-badge={this.state.num}><span style={style}>Segnalazioni</span></span>
            </a>
            </div>
        )
    }
}