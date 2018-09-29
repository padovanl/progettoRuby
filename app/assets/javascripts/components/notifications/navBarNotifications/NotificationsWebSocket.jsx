
class NotificationsWebSocket extends React.Component {
    componentDidMount() {
        let user_id = this.props.current_user.id
        window.App.notification = window.App.cable.subscriptions
            .create({channel: "NotificationChannel", user_id: user_id}, {
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