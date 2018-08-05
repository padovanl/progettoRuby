
class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        // highlight-range{4}
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        /*const formData = new FormData(form);
        form.get('post[attachments][]').forEach((file) => {
            formData.append('files[]', file);
        });*/

        var myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }


        fetch('/posts.json', {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: data,
        }).then(handleErrors)
        .then(response => console.log(response.text()) )
        .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div className="control">
                    <label htmlFor="post_message">Message</label>
                    <textarea ref={this.message} className="textarea" type="text"
                              name="post[message]"
                              id="post_message" placeholder="Scrivi un post..."/>
                </div>

                <div className="field">
                    <label htmlFor="post_attachments">Attachments</label>
                    <input ref={this.fileInput} multiple="multiple" type="file"
                           name="post[attachments][]" id="post_attachments"/>
                </div>

                <div className="actions">
                    <input type="submit" name="commit" value="Create Post" />
                </div>
            </form>
        )
    }
}