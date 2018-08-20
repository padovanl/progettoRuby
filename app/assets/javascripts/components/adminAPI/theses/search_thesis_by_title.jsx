

class SearchThesisByTitle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            typed: ''
        };
        this.onChange= this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({typed: event.target.value});
        this.props.searchByTitle(event.target.value);
    }
    render() {
        return (
                <div>
                    <input type="text" placeholder="Titolo tesi.." onChange={this.onChange.bind(this)} className="input is-medium"/>
                    You typed: <code>{this.state.typed}</code>
                </div>
            )
    }
}