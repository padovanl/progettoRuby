class UpvotesWebSocket extends React.Component {
    componentDidMount() {
        window.App.post = window.App.cable.subscriptions
            .create({channel: "UpvoteChannel", room: this.props.postData}, {
            received: (newLine) => {
                console.log(newLine)
                this.props['data-updateApp'](newLine)
            }
        })
    }
    render() {
        return(
            <div />
        )
    }
}