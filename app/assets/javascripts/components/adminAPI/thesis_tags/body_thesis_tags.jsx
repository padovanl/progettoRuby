class BodyThesisTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewThesisTags = this.addNewThesisTags.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteThesisTags = this.deleteThesisTags.bind(this);
    }



    handleDelete(id){
        let linkDelete = '/api/v1/theses/' + this.props.thesis_id + '/thesis_tags/' + id;
        if(confirm('Sei sicuro di voler eliminare questo tag?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    this.deleteThesisTags(id)
                }else{
                    alert("errore")
                }
            })
        }

    }

    deleteThesisTags(id){
        let newThesisTags = this.state.tags.filter((f) => f.id !== id)
        this.setState({
            tags: newThesisTags
        })
    }

    handleFormSubmit(thesis_id, tag_id){
        let body = JSON.stringify({thesisTag: {thesis_id: thesis_id, tag_id: tag_id}});
        let linkNew = '/api/v1/theses/' + this.props.thesis_id + '/thesis_tags';
        if(thesis_id != '' && tag_id != ''){
            fetch(linkNew, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then((response) => {return response.json()})
                .then((thesisTag)=>{
                    if(thesisTag.error){
                        alert("Errore!")
                    }else{
                        this.addNewThesisTags(thesisTag);
                    }

                })
        }else{
            alert('I campi non possono essere vuoti!')
        }


    }

    addNewThesisTags(thesisTag){
        this.setState({
            tags: this.state.tags.concat(thesisTag)
        })
    }

    componentDidMount(){
        let linkGet = '/api/v1/theses/' + this.props.thesis_id + '/thesis_tags.json'
        fetch(linkGet)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ tags: data }) });
    }


    render(){
        return(
            <div>
                <AllThesisTags tags={this.state.tags} handleDelete={this.handleDelete}  handleUpdate = {this.handleUpdate} thesis_id={this.props.thesis_id} />
                <br/>
                <NewThesisTag handleFormSubmit={this.handleFormSubmit} thesis_id={this.props.thesis_id} />

            </div>
        )
    }
}