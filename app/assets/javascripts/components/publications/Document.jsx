class Document extends React.Component {
    render() {
        const { document } = this.props

        return (<a className="link-to-commets" href={ document.file_url }>{ document.filename }</a>)
    }
}