class ThesisTag extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let thesis_id = this.thesis_id.value;
            let tag_id = this.tag_id.value;
            let id = this.props.thesisTag.id;
            let thesisTag = {id: id, thesis_id: thesis_id, tag_id: tag_id};
            this.props.handleUpdate(thesisTag);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){
        let thesis_id = <i>{this.props.thesisTag.thesis_id}</i>;
        let tag_id = <i>{this.props.thesisTag.tag_id}</i>;
        let pulsante = <i className="fas fa-pen"></i>;


        return(
            <tr key={this.props.thesisTag.id}>
                <td>{thesis_id}</td>
                <td>{tag_id}</td>
                <td>
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.thesisTag.id)} title="Elimina"><i className="fas fa-trash"></i></a>
                </td>
            </tr>

        )
    }
}