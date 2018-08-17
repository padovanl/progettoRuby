class Course2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        //this.handleEdit = this.handleEdit.bind(this)
    }

    /*handleEdit(){
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
    }*/

    render(){
        let name = <i>{this.props.course.name}</i>;
        let anno = <i>{this.props.course.year}</i>;
        //let pulsante = <i className="fas fa-pen"></i>;


        return(
            <tr key={this.props.course.id}>
                <td>{name}</td>
                <td>{anno}</td>
                <td>
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.course.id)} title="Elimina"><i className="fas fa-times"></i></a>
                </td>
            </tr>

        )
    }
}