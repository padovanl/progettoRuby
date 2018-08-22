

class SearchThesisByTitle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            typed: ''
        };
        this.onChange = this.onChange.bind(this);
        this.clickFn = this.clickFn.bind(this);
    }

    onChange(event) {
            this.setState({typed: event.target.value});
            this.props.searchByTitle(event.target.value);
    }

    clickFn(){
        if(document.getElementById('textBoxThesisSearch').value != '') {
            document.getElementById('textBoxThesisSearch').value = '';
            this.props.getAll();
        }
    }

    render() {
        let hoverStyle = {

        };
        return (
            <div className="columns">
                <div className="column">
                    <p><b>Cerca per titolo:</b></p>
                </div>
                <div className="column is-9">
                    <div className="field has-addons">
                        <div className="control">
                            <input type="text" placeholder="Titolo tesi.." onChange={this.onChange.bind(this)} className="input is-normal is-rounded" id="textBoxThesisSearch"/>
                        </div>
                        <div id="divCancelFilter" className="control">
                            <a className="button is-rounded is-danger" onClick={this.clickFn} id="buttonFilter">
                                <i className="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="column">
                </div>
            </div>


            )
    }
}