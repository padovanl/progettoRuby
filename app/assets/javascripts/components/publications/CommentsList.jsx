
class CommentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
        };
    }


    linkToCommets(comments_count){
        if(comments_count)
            switch (comments_count) {
                case 1:
                    return 'Visualizza ' + comments_count + ' commento'
                default:
                    return 'Visualizza i ' + comments_count + ' commenti'
            }
        else
            return ''
    }

    altro() {
        fetch('/comments?course_id=' + this.props.course_id)
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        if(this.props.comments)
            return <div>
                <article className="media">
                <figure className="media-left">
                    <p className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png"/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>Sean Brown</strong>
                            <br/>
                            Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique
                            senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla
                            sagittis, a lobortis leo feugiat.
                            <br/>
                            <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                        </p>
                    </div>
                </div>
            </article>

                <article className="media">
                    <figure className="media-left">
                        <p className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png"/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>Kayli Eunice </strong>
                                <br/>
                                Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas varius felis sit
                                amet magna vestibulum euismod malesuada cursus libero. Vestibulum ante ipsum primis in
                                faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lacinia non nisl id
                                feugiat.
                                <br/>
                                <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        else
            return <a className="link-to-commets"><small>{this.linkToCommets(this.props.comments_count)}</small></a>


    }
}