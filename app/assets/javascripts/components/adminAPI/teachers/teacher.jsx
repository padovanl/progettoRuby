class Teacher extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
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
    }

    render(){
        let name = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.name = input} defaultValue={this.props.teacher.name}/>:<i>{this.props.teacher.name}</i>;
        let surname = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.surname = input} defaultValue={this.props.teacher.surname}/>:<i>{this.props.teacher.surname}</i>;
        let link_cv = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.link_cv = input} defaultValue={this.props.teacher.link_cv}/>:<i><a target="_blank" href={this.props.teacher.link_cv}>Link alla pagina UNIFE</a></i>;

        let pulsante;
        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }
        return(
            <tr key={this.props.teacher.id}>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{link_cv}</td>
                <td>
                    <a className="button is-rounded is-success" onClick={() => this.handleEdit()} title="Modifica">{pulsante}</a>&nbsp;
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.teacher.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}