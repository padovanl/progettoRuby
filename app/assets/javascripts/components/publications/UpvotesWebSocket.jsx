
class UpvotesWebSocket extends React.Component {
    componentDidMount() {
        // this.props['data-getLineData'](window.location.href.match(/\d+$/)[0])
        this.props['data-cableApp'].post = this.props['data-cableApp'].cable.subscriptions
            .create({channel: "UpvoteChannel", room: this.props.postData}, {
            received: (newLine) => {
                console.log(newLine)
                this.props['data-updateApp'](newLine.upvoters)
            }
        })
    }
    render() {
        return(
            <div />
        )
    }
}