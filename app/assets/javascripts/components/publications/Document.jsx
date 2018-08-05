class Document extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/documents/' + this.props.document.id)
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        if (this.state.data.file_name) {
            return (<a className="link-to-commets" href={ this.state.data.link }>{ this.state.data.file_name }</a>);
        }

        return (<span>Loading...</span>);
    }
}