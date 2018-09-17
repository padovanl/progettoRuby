class MainNotifications extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyNotifications last_page={this.props.last_page} url={this.props.url} />
            </div>
        )
    }
}