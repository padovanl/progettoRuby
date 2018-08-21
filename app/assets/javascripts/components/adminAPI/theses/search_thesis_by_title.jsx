

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
            <div className="columns">
                <div className="column">
                    <p><b>Cerca per titolo:</b></p>
                </div>
                <div className="column is-9">
                    <input type="search" placeholder="Titolo tesi.." onChange={this.onChange.bind(this)} className="input is-normal is-half" id="textBoxThesisSearch"/>
                </div>
                <div className="column"></div>
            </div>
            )
    }
}