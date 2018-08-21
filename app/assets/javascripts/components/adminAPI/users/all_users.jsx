const AllUsers = (props) => {

    var users = props.users.map((user) => {
        return(
            <User user={user} />
        )
    })

    return(
        <div>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ruolo</th>
                    <th>Opzioni</th>
                </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </table>
        </div>
    )
}