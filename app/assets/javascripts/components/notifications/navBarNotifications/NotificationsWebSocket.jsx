
class NotificationsWebSocket extends React.Component {
    componentDidMount() {
        window.App.notification = window.App.cable.subscriptions
            .create({channel: "NotificationChannel"}, {
            received: (newLine) => {
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