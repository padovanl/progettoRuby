class CourseTip extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let tip_text = this.tip_text.value;
            let id = this.props.courseTip.id;
            this.props.handleUpdate(tip_text, id);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){

        let pulsante;
        let linkReport = '/report_tip/' + this.props.courseTip.id;

        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }


        const delete_button_item = <a className="button is-rounded is-danger"
                                      onClick={() => this.props.handleDelete(this.props.courseTip.id)}
                                      title="Elimina">
                                    <i className="fas fa-times"></i>
                                  </a>

        const update_button_item = <a className="button is-rounded is-success"
                                      onClick={() => this.handleEdit()}
                                      title="Modifica">
                                    {pulsante}
                                   </a>

        const tip_text = this.state.editable ? <input required={true} type='text' className="input is-medium"  ref={input => this.tip_text = input} defaultValue={this.props.courseTip.tip}/>:<i>{this.props.courseTip.tip}</i>;

        return(
            <tr key={this.props.courseTip.id}>
                <td className="question_text_column_desktop">{tip_text}</td>
                {this.props.show_details  ? <td>
                    { (this.props.courseTip.user_id == this.props.current_user.id && this.props.show_details) || this.props.current_user.admin ? <div> {update_button_item} <span> </span>{delete_button_item} </div> : null}
                </td> : null}
                <td className="has-text-right"><a title="Reporting" onClick={() => this.props.activeModal(linkReport)}><i className="fas fa-bug"/></a></td>
            </tr>
        )
    }
}