class BodyTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTag = this.updateTag.bind(this)
    }

    handleUpdate(tag){
        if(tag.name != ''){
            fetch(`http://localhost:3000/api/v1/tags/${tag.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({tag: tag}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                this.updateTag(tag)
            })
        }else{
            alert("Il nome del tag non può essere vuoto!")
        }

    }

    updateTag(tag){
        let newTag = this.state.tags.filter((f) => f.id !== tag.id)
        newTag.push(tag)
        this.setState({
            tags: newTag
        })
    }

    handleDelete(id){
        fetch(`http://localhost:3000/api/v1/tags/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            if (response.ok){
                this.deleteTag(id)
            }else{
                alert("errore")
            }
        })
    }

    deleteTag(id){
        newTag = this.state.tags.filter((tag) => tag.id !== id)
        this.setState({
            tags: newTag
        })
    }

    handleFormSubmit(name){
        let body = JSON.stringify({tag: {name: name} })

        if(name != ''){
            fetch('http://localhost:3000/api/v1/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then((response) => {return response.json()})
                .then((tag)=>{
                    this.addNewTag(tag);
                    document.getElementById('insertNewTag').value = '';
                })
        }else{
            alert('Inserisci il nome del tag.')
        }


    }

    addNewTag(tag){
        this.setState({
            tags: this.state.tags.concat(tag)
        })
    }

    componentDidMount(){
        fetch('/api/v1/tags.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ tags: data }) });
    }


    render(){
        return(
            <div>

                <AllTags tags={this.state.tags} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} />
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                    <NewTag handleFormSubmit={this.handleFormSubmit} />
                    </tbody>
                </table>
            </div>
        )
    }
}