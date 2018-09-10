

class AllUsers extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){
        var users = this.props.users.map((user) => {
            return(
                <User user={user} handleSetAdmin={this.props.handleSetAdmin}/>
            )
        });

        var scroolStyle = {
            overflowX: "auto",
        };

        return(
            <div style={scroolStyle}>
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
}