
class NewPost extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form encType="multipart/form-data" action="/posts" accept-charset="UTF-8" method="post">
                <input name="utf8"
                                                                                                            type="hidden"
                                                                                                            value="&#x2713;"/><input
                type="hidden" name="authenticity_token"
                value="VYxQ7XvtP/56yMLERY6Sgq+XUd23jCZAZ4icMUkRFGuUMWjK9jnf7GHsg9G2XzTuKlBQsqB2ppmiaxCtiqHYcQ=="/>

                <div className="field">
                    <label htmlFor="post_message">Message</label>
                    <input type="text" name="post[message]" id="post_message"/>
                </div>

                <div className="field">
                    <label htmlFor="post_attachments">Attachments</label>
                    <input multiple="multiple" type="file" name="post[attachments][]" id="post_attachments"/>
                </div>

                <div className="actions">
                    <input type="submit" name="commit" value="Create Post" data-disable-with="Create Post"/>
                </div>
            </form>
        );
    }
}