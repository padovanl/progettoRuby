class DegreeCourse extends React.Component{

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
            //let tipo = this.tipo.value;
            let id = this.props.course.id;
            let course = {id: id, name: name, tipo: this.props.course.tipo};
            this.props.handleUpdate(course);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){
        let name = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.name = input} defaultValue={this.props.course.name}/>:<i>{this.props.course.name}</i>;
        let tipo = <i>{this.props.course.tipo}</i>;

        let pulsante;

        let link = "/dashboard/cdl/courses/" + this.props.course.id;

        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }
        return(
            <tr key={this.props.course.id}>
                <td>{name}</td>
                <td>{tipo}</td>
                <td>
                    <a className="button is-rounded is-success" onClick={() => this.handleEdit()} title="Modifica">{pulsante}</a>&nbsp;
                    <a className="button is-rounded is-warning" href={link} title="Gestisci corsi collegati"><i className="fas fa-graduation-cap"></i></a>&nbsp;
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.course.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}