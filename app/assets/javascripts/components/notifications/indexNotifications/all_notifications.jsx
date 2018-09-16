const AllNotifications = (props) => {

    var notifications = props.notifications.map((n) => {
        return(
            <Notification notification={n} handleDelete={props.handleDelete} />
        )
    })
    if(notifications.length > 0){
        return(
            <div>
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Opzioni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notifications}
                    </tbody>
                </table>

            </div>
        )
    }else{
        return(
                <div><p>Non ci sono nuove notifiche al momento.</p></div>
            )

    }

}