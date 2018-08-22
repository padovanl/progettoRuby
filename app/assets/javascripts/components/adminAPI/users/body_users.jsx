class BodyUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        /*this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTeacher = this.addNewTeacher.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTeacher = this.deleteTeacher.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTeacher = this.updateTeacher.bind(this)*/
        this.handleSetAdmin = this.handleSetAdmin.bind(this);
    }




    componentDidMount(){
        fetch('/api/v1/users.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ users: data }) });
    }

    handleSetAdmin(id){
        if(confirm('Sei sicuro di voler promuovere questo utente ad amministratore?')){
            fetch('/api/v1/users/set_admin/' + id,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    this.componentDidMount()
                }else{
                    alert("errore")
                }
            })
        }
    }


    render(){
        return(
            <div>
                <AllUsers users={this.state.users} handleSetAdmin={this.handleSetAdmin}/>
            </div>
        )
    }
}