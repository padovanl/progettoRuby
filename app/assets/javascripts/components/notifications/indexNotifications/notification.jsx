class Notification extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        let descrizione = <i>{this.props.notification.notification.content}</i>;

        return(
            <tr key={this.props.notification.id}>
                <td>{descrizione}</td>
                <td>
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.notification.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}