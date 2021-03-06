class BodyNotifications extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notifications: [],
            url: '',
            page:1,
            disabledNext: false,
        };

        this.getAllNotifications = this.getAllNotifications.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleMarkAndRedirect = this.handleMarkAndRedirect.bind(this);

    }

    componentWillMount(){
        this.getAllNotifications();
    }

    getAllNotifications(){
        get_items(update_url_notifications(this.props.url, this.state.url, this.state.page))
            .then(data => {
                if (data.length === 0){
                    this.setState({disabledNext: true})
                }
                else{
                    this.setState({notifications: this.state.notifications.concat(data)})
                }
            })
            .catch(e => console.log(e)
            )
    }

    handleShowMore() {
        this.setState({page: this.state.page +=1},this.getAllNotifications());
    }

    handleMarkAndRedirect(redirect_url, id){
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());
        myHeaders.append('Content-Type', 'application/json');
        let linkUpdate = '/mark_as_read_notification/' + id;
        fetch(linkUpdate,
            {
                method: 'PUT',
                credentials: 'same-origin',
                headers: myHeaders
            }).then((response) => {
            return response.json()
        })
            .then((notification) => {
                if (notification.error) {
                    alert("Errore!")
                } else {
                    window.location.href = redirect_url;
                }
            })
    }

    render(){

        return(
            <div>
                <AllNotifications notifications={this.state.notifications}
                                  handleShowMore={this.handleShowMore}
                                  page={this.state.page}
                                  last_page={this.props.last_page}
                                  disabledNext={this.state.disabledNext}
                                  handleMarkAndRedirect={this.handleMarkAndRedirect}/>
            </div>
        )
    }
}