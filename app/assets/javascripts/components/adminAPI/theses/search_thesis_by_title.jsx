

class SearchThesisByProf extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.change = this.change.bind(this);
    }


    change(event){
        this.setState({value: event.target.value});
        this.props.searchByProf(event.target.value);
    }
    render(){
        return(
            <div>
                <select id="lang" onChange={this.change} value={this.state.value}>
                    <option value="0">Tutti</option>
                    <option value="1">Stefanelli</option>
                    <option value="2">Lamma</option>
                    <option value="3">Gavanelli</option>
                </select>
                <p></p>
                <p>{this.state.value}</p>
            </div>
        );
    }
}