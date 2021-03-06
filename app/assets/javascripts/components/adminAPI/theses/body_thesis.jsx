class BodyThesis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            theses: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewThesis = this.addNewThesis.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteThesis = this.deleteThesis.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateThesis = this.updateThesis.bind(this)

        this.foo = null;

        this.searchByProf = this.searchByProf.bind(this);
        this.searchByTitle = this.searchByTitle.bind(this);
        this.getAll = this.getAll.bind(this);
    }


    handleUpdate(t){
        if(t.name != '' && t.content != ''){
            fetch(`/api/v1/theses/${t.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({thesis: t}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                this.updateThesis(t)
            })
        }else{
            alert("Il titolo e la descrizione della tesi non possono essere vuoti!")
        }

    }


    updateThesis(t){
        //let newThesis = this.state.theses.filter((f) => f.id !== t.id)
        //this.getThesis(t.id);
        //newThesis.push(foo)
        //this.setState({
        //   theses: newThesis
        //})
        this.componentDidMount();
    }

    handleDelete(id){
        if(confirm('Sei sicuro di voler eliminare questa tesi?')){
            fetch(`/api/v1/theses/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    this.deleteThesis(id)
                }else{
                    alert("errore")
                }
            })
        }

    }

    deleteThesis(id){
        let newThesis = this.state.theses.filter((f) => f.id !== id)
        this.setState({
            theses: newThesis
        })
    }

    handleFormSubmit(title, content, teacher_id){
        let body = JSON.stringify({thesis: {title: title, content: content, teacher_id:teacher_id} })

        if(title != '' && content != ''){
            fetch('/api/v1/theses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then((response) => {return response.json()})
                .then((t)=>{
                    this.addNewThesis(t);
                    document.getElementById('insertNewThesis1').value = '';
                    document.getElementById('insertNewThesis2').value = '';
                    $("#modalTesi").removeClass("is-active");
                })
        }else{
            alert('Il titolo e la descrizione della tesi non possono essere vuoti!')
        }


    }

    addNewThesis(t){
        this.setState({
            theses: this.state.theses.concat(t)
        })
    }

    componentDidMount(){
        fetch('/api/v1/theses.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ theses: data }) });
    }

    getAll(){
        fetch('/api/v1/theses.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ theses: data }) });
    }

    searchByProf(prof){
        fetch('/api/v1/theses/search/prof/' + prof)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ theses: data }) });
    }

    searchByTitle(stringa){
        fetch('/api/v1/theses/search/title/' + stringa)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ theses: data }) });
    }


    render(){
        return(
            <div>
                {/*<SearchThesisByProf searchByProf={this.searchByProf}/>*/}
                <SearchThesisByTitle searchByTitle={this.searchByTitle} getAll={this.getAll} />


                <br/>
                <AllTheses theses={this.state.theses} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
                <NewThesis handleFormSubmit={this.handleFormSubmit} />
            </div>
        )
    }
}