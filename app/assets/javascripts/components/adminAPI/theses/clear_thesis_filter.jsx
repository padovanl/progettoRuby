

class ClearThesisFilter extends React.Component{

    constructor(props) {
        super(props);
        this.temp = [];
        this.clickFn = this.clickFn.bind(this);
    }



    clickFn(){
        this.props.getAll();
        document.getElementById('lang').selectedIndex = 0;
        document.getElementById('textBoxThesisSearch').value = '';
    }

    render(){


        return(
            <div className="columns">
                <div className="column">
                    <button className="button is-danger is-small is-rounded" onClick={this.clickFn}>Reset</button>
                </div>
                <div className="column"></div>
            </div>

        );
    }
}