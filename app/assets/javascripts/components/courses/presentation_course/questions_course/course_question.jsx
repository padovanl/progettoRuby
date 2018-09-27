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
            this.props.handleUpdate(question_text, id);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){

        let question_freq = <i>{this.props.courseQuestion.frequency_questions.length}</i>;
        let question_id = this.props.courseQuestion.frequency_questions[0].course_question_id;
        let quote_id = this.props.courseQuestion.frequency
        let hasBeenQuotedID = this.props.courseQuestion.frequency_questions.filter((f) => f.user_id == this.props.user_id)
        const frequency_question_id = hasBeenQuotedID.length > 0 ? hasBeenQuotedID[0].id : null
        let pulsante = !this.state.editable ? <i className="fas fa-pen"></i> : <i className="fas fa-check"></i>;
        let linkReport = '/report_question/' + this.props.courseQuestion.id + '?course_id=' + this.props.course_id;


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

        const quote_up_button_item = <a className="button is-rounded is-success"
                                      onClick={() => this.props.handleQuoteUp(question_id)}
                                      title="Up-Quote Domanda">
                                    <i className="fas fa-plus"></i>
                                    </a>

        const quote_down_button_item = <a className="button is-rounded is-danger"
                                   onClick={() => this.props.handleQuoteDown(question_id, frequency_question_id)}
                                   title="Down-Quote Domanda">
                                    <i className="fas fa-minus"></i>
                                  </a>

        const question_text = this.state.editable ? <input required={true} type='text' className="input is-medium"  ref={input => this.question_text = input} defaultValue={this.props.courseQuestion.question}/>:<i>{this.props.courseQuestion.question}</i>;

        return(
            <tr key={this.props.courseQuestion.id}>
                <td className="is-hidden-touch question_text_column_desktop">{question_text}</td>
                <td className="is-hidden-desktop question_text_column_mobile">{question_text}</td>
                <td className="has-text-centered ">{question_freq}</td>
                {this.props.show_details || this.props.show_quotes  ? <td>
                    { this.props.courseQuestion.user_id == this.props.user_id && this.props.show_details ? <div> {update_button_item} <span> </span>{delete_button_item} </div> : null}
                    { this.props.courseQuestion.user_id != this.props.user_id && this.props.show_quotes && hasBeenQuotedID.length == 0 ? <div> {quote_up_button_item} </div>  :  null}
                    { this.props.courseQuestion.user_id != this.props.user_id && this.props.show_quotes && hasBeenQuotedID.length != 0 ? <div> {quote_down_button_item} </div>  :  null}
                </td> : null}
                <td className="has-text-right"><a title="Reporting" onClick={() => this.props.activeModal(linkReport)}><i className="fas fa-bug"/></a></td>
            </tr>
        )
    }
}