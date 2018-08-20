class ErrorMessage extends React.Component {
    render() {
        return (
            <p className="help is-danger">{ this.props.message }</p>
        )
    }
}