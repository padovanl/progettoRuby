class BodyTeacher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTeacher = this.addNewTeacher.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTeacher = this.deleteTeacher.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTeacher = this.updateTeacher.bind(this)
    }


    handleUpdate(teacher){
        if(teacher.name != '' && teacher.surname != '' && teacher.link_cv != ''){
            fetch(`/api/v1/teachers/${teacher.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({teacher: teacher}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                this.updateTeacher(teacher)
            })
        }else{
            alert("I campi non possono essere vuoti!")
        }

    }

    updateTeacher(teacher){
        let newTeacher = this.state.teachers.filter((f) => f.id !== teacher.id)
        newTeacher.push(teacher)
        this.setState({
            teachers: newTeacher
        })
    }

    handleDelete(id){
        if(confirm('Sei sicuro di voler eliminare questo professore?')){
            fetch(`/api/v1/teachers/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    this.deleteTeacher(id)
                }else{
                    alert("errore")
                }
            })
        }

    }

    deleteTeacher(id){
        let newTeacher = this.state.teachers.filter((f) => f.id !== id)
        this.setState({
            teachers: newTeacher
        })
    }

    handleFormSubmit(name, surname, link_cv){
        let body = JSON.stringify({teacher: {name: name, surname: surname, link_cv: link_cv} })

        if(name != '' && surname != '' && link_cv != ''){
            fetch('/api/v1/teachers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then((response) => {return response.json()})
                .then((teacher)=>{
                    this.addNewTeacher(teacher);
                    document.getElementById('insertNewTeacher1').value = '';
                    document.getElementById('insertNewTeacher2').value = '';
                    document.getElementById('insertNewTeacher3').value = '';
                })
        }else{
            alert('I campi non possono essere vuoti!')
        }


    }

    addNewTeacher(teacher){
        this.setState({
            teachers: this.state.teachers.concat(teacher)
        })
    }

    componentDidMount(){
        fetch('/api/v1/teachers.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ teachers: data }) });
    }


    render(){
        return(
            <div>
                <AllTeachers teachers={this.state.teachers} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
                <br/>
                <NewTeacher handleFormSubmit={this.handleFormSubmit} />
            </div>
        )
    }
}