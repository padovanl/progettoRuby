class BodyNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.deleteNotifications = this.deleteNotifications.bind(this);
    }



    handleDelete(id){
        fetch(`http://localhost:3000/api/v1/notifications/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            if (response.ok){
                this.deleteNotifications(id)
            }else{
                alert("errore")
            }
        })
    }

    deleteNotifications(id){
        t = this.state.notifications.filter((n) => n.id !== id)
        this.setState({
            notifications: t
        })
    }

    componentDidMount(){
        fetch('/api/v1/notifications.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ notifications: data }) });
    }


    render(){
        return(
            <div>
                <AllNotifications notifications={this.state.notifications} handleDelete={this.handleDelete} />
            </div>
        )
    }
}