class MainShowReport extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyShowReport report_id={this.props.report_id} />
            </div>
        )
    }
}