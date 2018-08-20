
class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            showError: false
        };

    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.content === '') {
            this.setState({showError: true});
            return
        }

        const data = new FormData(event.target);
        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        fetch('/comments', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

        this.setState({
            content: '',
            showError: false
        });
    }

    render() {
        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-32x32">
                        <img src={ this.props.current_user_avatar }/>
                    </p>
                </figure>
                <form onSubmit={ (e) => this.handleSubmit(e) } className="comment-form">
                    <input className="input" name="comment[post_id]" value={ this.props.post_id } type="hidden"  />
                    <div className="media-content" >
                        <div className="field">
                            <p className="control">
                                <textarea className="textarea" placeholder="Aggiungi un commento..." name="comment[content]"
                                          rows="1" value={ this.state.content }  onChange={ (e) => this.handleChange(e) } />
                            </p>
                            { this.state.showError ? <ErrorMessage message="Il campo non può essere vuoto" /> : "" }
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