

class ClearThesisFilter extends React.Component{

    constructor(props) {
        super(props);
        this.temp = [];
        this.clickFn = this.clickFn.bind(this);
    }





    render(){


        return(
                    <button className="button is-danger is-small is-rounded" onClick={this.clickFn}>Reset</button>
        );
    }
}