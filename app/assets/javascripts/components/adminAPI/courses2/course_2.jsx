class Course2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(){
        if(this.state.editable){
            let degree_course_id = this.props.degree_course_id;
            let year = this.year.value;
            let name = this.name.value;
            let id = this.props.course.id;
            let course = {id: id, name: name, year: year, degree_course_id: degree_course_id};
            this.props.handleUpdate(course);
        }
        this.setState({
            editable: !this.state.editable
        })
    }

    render(){

        let anno = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.year = input} defaultValue={this.props.course.year}/>:<i>{this.props.course.year}</i>;

        let name = this.state.editable ? <input required={true} type='text'className="input is-medium"  ref={input => this.name = input} defaultValue={this.props.course.name}/>:<i>{this.props.course.name}</i>;

        //let pulsante = <i className="fas fa-pen"></i>;

        let pulsante = null;
        let link = "/dashboard/degree_course/" + this.props.degree_course_id + "/course/teachers/" + this.props.course.id;

        if(!this.state.editable){
            pulsante = <i className="fas fa-pen"></i>;
        }else{
            pulsante = <i className="fas fa-check"></i>;
        }

        return(
            <tr key={this.props.course.id}>
                <td>{name}</td>
                <td>{anno}</td>
                <td>
                    <a className="button is-rounded is-success" onClick={() => this.handleEdit()} title="Modifica">{pulsante}</a>&nbsp;
                    <a className="button is-rounded is-warning" href={link} title="Gestisci i professori collegati"><i className="fas fa-graduation-cap"></i></a>&nbsp;
                    <a className="button is-rounded is-danger" onClick={() => this.props.handleDelete(this.props.course.id)} title="Elimina"><i className="fas fa-times"></i></a>
                </td>
            </tr>

        )
    }
}