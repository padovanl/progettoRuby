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
        console.log("dentro showmore")
        this.setState({page: this.state.page +=1},this.getAllNotifications());
    }

    render(){

        return(
            <div>
                <AllNotifications notifications={this.state.notifications}
                                  handleShowMore={this.handleShowMore}
                                  page={this.state.page}
                                  last_page={this.props.last_page}
                                  disabledNext={this.state.disabledNext} />
            </div>
        )
    }
}