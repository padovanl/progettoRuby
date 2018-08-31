class CourseQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let question_text = this.question_text.value;
            let id = this.props.courseQuestion.id;
            //let courseQuestion = {id: id, question: question_text};
            //console.log(edit_question);
            this.props.handleUpdate(question_text, id);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){
        //console.log("testo", this.props.courseQuestion.question)
        //let question_text = <i>{this.props.courseQuestion.question}</i>;
        let question_freq = <i>{this.props.courseQuestion.frequency}</i>;
        let pulsante;

        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }

        const delete_button_item = <a className="button is-rounded is-danger"
                                      onClick={() => this.props.handleDelete(this.props.courseQuestion.id)}
                                      title="Elimina">
                                    <i className="fas fa-times"></i>
                                  </a>

        const update_button_item = <a className="button is-rounded is-success"
                                      onClick={() => this.handleEdit()}
                                      title="Modifica">
                                    {pulsante}
                                   </a>

        const question_text = this.state.editable ? <input required={true} type='text' className="input is-medium"  ref={input => this.question_text = input} defaultValue={this.props.courseQuestion.question}/>:<i>{this.props.courseQuestion.question}</i>;

        return(
            <tr key={this.props.courseQuestion.id}>
                <td>{question_text}</td>
                <td>{question_freq}</td>
                { this.props.courseQuestion.user_id == this.props.user_id ? <td>{update_button_item}<span> </span>{delete_button_item}</td>  : null}
            </tr>
        )
    }
}