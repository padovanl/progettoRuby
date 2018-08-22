class User extends React.Component{

    /*constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        //this.handleEdit = this.handleEdit.bind(this)
    }*/

    /*handleEdit(){
        if(this.state.editable){
            let name = this.name.value;
            let surname = this.surname.value;
            let link_cv = this.link_cv.value;
            let id = this.props.teacher.id;
            let teacher = {id: id, name: name, surname: surname, link_cv: link_cv};
            this.props.handleUpdate(teacher);
        }
        this.setState({
            editable: !this.state.editable
        })
    }*/

    render(){
        let name = <i>{this.props.user.name}</i>;
        let email = <i>{this.props.user.email}</i>;

        let circleStyle = {
            borderRadius: 2,
        };
        let image = <img src={this.props.user.avatar_url} className="is-rounded" width={30} height={30} style={circleStyle}/>
        let ruolo;

        if(this.props.user.admin){
            ruolo = <i>Admin</i>
        }else{
            ruolo = <i></i>
        }

        let pulsante = '';
        if(!this.props.user.admin)
            pulsante = <a className="button is-rounded is-success" title="Promuovi ad amministratore" onClick={() => this.props.handleSetAdmin(this.props.user.id)}><i className="fas fa-level-up-alt"></i></a>;
        else
            pulsante = '';
        return(
            <tr key={this.props.user.id}>
                <td>{image}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{ruolo}</td>
                <td>
                    {pulsante}
                </td>
            </tr>

        )
    }
}