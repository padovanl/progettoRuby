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
        let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.course.name}/>:<i>{this.props.course.name}</i>;
        let tipo = <i>{this.props.course.tipo}</i>;
        return(
            <div>
                <p>
                    {name}&nbsp;
                    {tipo}&nbsp;
                    <button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>
                    <button onClick={() => this.props.handleDelete(this.props.course.id)}>Delete</button>
                </p>
            </div>
        )
    }
}