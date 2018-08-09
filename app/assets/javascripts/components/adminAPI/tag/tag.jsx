class Tag extends React.Component{

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
            let id = this.props.tag.id;
            let tag = {id: id, name: name};
            this.props.handleUpdate(tag);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){
        let name = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.name = input} defaultValue={this.props.tag.name}/>:<i>{this.props.tag.name}</i>;

        let pulsante;
        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }
        return(
            <tr key={this.props.tag.id}>
                <td>{name}</td>
                <td>
                    <a className="button is-rounded is-success" onClick={() => this.handleEdit()} title="Modifica">{pulsante}</a>&nbsp;
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.tag.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}