
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
            return <div>Lista dei commenti</div>
        else
            return <a className="link-to-commets"><small>{this.linkToCommets(this.props.comments_count)}</small></a>


    }
}