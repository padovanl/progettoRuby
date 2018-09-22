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
        console.log("update report count")
            if (this.state.num > 0){
                let linkUpdate = '/update_is_selected_report';
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
            marginLeft: 15,
            marginBottom: 4
        };

        //this.getCountNew();
        //this.getCountNew();
        return(
            <a className="navbar-item level" onClick={() => this.handleUpdateIsSelected()} href="/reports">
                <div className="level-left">
                    <div className="level-item">
                        Segnalazioni
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <div className="badge is-badge-primary bd-emoji" data-badge={this.state.num} style={style}></div>
                    </div>
                </div>
            </a>
        )
    }
}