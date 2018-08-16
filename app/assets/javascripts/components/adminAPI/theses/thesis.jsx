class Thesis extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let title = this.title.value;
            let content = this.content.value;
            //let teacher_id = this.teacher_id.value;
            let id = this.props.thesis.id;


            let t = {id: id, title: title, content: content, teacher_id: this.props.thesis.teacher_id};

            this.props.handleUpdate(t);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){

        let title = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.title = input} defaultValue={this.props.thesis.title}/>:<i>{this.props.thesis.title}</i>;
        let content = this.state.editable ? <textarea required={true} type='text'className="input is-medium"  ref={input => this.content = input} defaultValue={this.props.thesis.content}/>:<i>{this.props.thesis.content.substring(0,100).concat("...")}</i>;
        //let teacher_id = this.state.editable ? <input readOnly="true" required={true} type='text'className="input is-medium"  ref={input => this.teacher_id = input} defaultValue={this.props.thesis.teacher_id}/>:<i>{this.props.thesis.teacher_id}</i>;
        let teacher_id = <i>{this.props.thesis.teacher.name}&nbsp;{this.props.thesis.teacher.surname}</i>;

        let pulsante;
        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }

        let link = "/theses/" + this.props.thesis.id;
        return(
            <tr key={this.props.thesis.id}>
                <td>{title}</td>
                <td>{content}</td>
                <td>{teacher_id}</td>
                <td>
                    <a className="button is-rounded is-success" onClick={() => this.handleEdit()} title="Modifica">{pulsante}</a>&nbsp;
                    <a className="button is-rounded is-primary" target="_blank" href={link} title="Vai alla pagina della tesi">&nbsp;<i className="fas fa-info"></i>&nbsp;</a>&nbsp;
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.thesis.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}