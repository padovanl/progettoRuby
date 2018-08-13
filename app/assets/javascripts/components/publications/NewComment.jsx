
class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };

    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const addNewComment = this.props.addNewComment

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch('/comments.json', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data,
        }).then(handleErrors)
            .then(response => {
                return response.json();
            }).then(function(json) {
            addNewComment(json)
        })
            .catch(error => console.log(error));

        this.setState({content: ''});
    }

    render() {
        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png"/>
                    </p>
                </figure>
                <form onSubmit={ (e) => this.handleSubmit(e) } className="comment-form">
                    <input className="input" name="comment[post_id]" value={ this.props.post_id } type="hidden"  />
                    <div className="media-content" >
                        <div className="field">
                            <p className="control">
                                <textarea className="textarea" placeholder="Aggiungi un commento..." name="comment[content]"
                                          rows="2" value={ this.state.content }  onChange={ (e) => this.handleChange(e) } />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button" type="submit" name="commit">Invia</button>
                            </p>
                        </div>
                    </div>
                </form>
            </article>
        )
    }
}