class ThesisDash extends React.Component{

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

        let descrizioneTroncata;
        let trovataLettera = false;
        let indice = -1;
        for(i = 50; i > 10 && !trovataLettera; i--){
            if(this.props.thesis.content[i - 1] != ' '){
                trovataLettera = true;
                indice = i;
            }
        }

        descrizioneTroncata = this.props.thesis.content.substring(0,indice).concat("...")

        let title = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.title = input} defaultValue={this.props.thesis.title}/>:<i>{this.props.thesis.title}</i>;
        let content = this.state.editable ? <textarea style={{height:300}} required={true} type='text'className="input is-medium"  ref={input => this.content = input} defaultValue={this.props.thesis.content}/>:<i>{descrizioneTroncata}</i>;
        //let teacher_id = this.state.editable ? <input readOnly="true" required={true} type='text'className="input is-medium"  ref={input => this.teacher_id = input} defaultValue={this.props.thesis.teacher_id}/>:<i>{this.props.thesis.teacher_id}</i>;
        let teacher_id = <i>{this.props.thesis.teacher.name}&nbsp;{this.props.thesis.teacher.surname}</i>;

        let pulsante;
        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }


        let link = "/theses/" + this.props.thesis.id;
        let link_to_tags = "/dashboard/thesis/tags/" + this.props.thesis.id;

        return(
            <tr key={this.props.thesis.id}>
                <td>{title}</td>
                <td className="is-hidden-mobile">{content}</td>
                <td>{teacher_id}</td>
                <td>
                    <a className="button is-rounded is-success" onClick={() => this.handleEdit()} title="Modifica">{pulsante}</a>&nbsp;
                    <a className="button is-rounded is-primary" target="_blank" href={link} title="Vai alla pagina della tesi">&nbsp;<i className="fas fa-info"></i>&nbsp;</a>&nbsp;
                    <a className="button is-rounded is-warning" href={link_to_tags} title="Gestisci tag collegati"><i className="fas fa-tags"></i></a>&nbsp;
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.thesis.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}