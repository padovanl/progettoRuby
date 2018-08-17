


class NewThesisTag extends React.Component {

    constructor(props){
        super(props);
        this.temp = [];
    }
    getTags(){
        fetch('/api/v1/tags.json')
            .then((response) => {return response.json()})
            .then((data) => { this.temp = data; });
    }

    render() {
        let formFields = {};
        this.getTags();
        var tagList = this.temp;

        return(
            <tr>
                <td>
                    <input ref={input => formFields.thesis_id = input} type="hidden" value={this.props.thesis_id}/>
                </td>
                <td>
                    <div className="select">
                        <select ref={input => formFields.tag_id = input} className="input is-medium" >
                            {tagList.map(function(t){
                                return <option key={t.id} value={t.id}>{t.name}</option>
                            })}
                        </select>
                    </div>
                </td>
                <td>
                    <a className="button is-rounded is-link is-fullwidth" onClick={ () => this.props.handleFormSubmit(formFields.thesis_id.value, formFields.tag_id.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}