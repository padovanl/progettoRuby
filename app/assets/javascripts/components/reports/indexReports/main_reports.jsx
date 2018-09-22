class MainReports extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <BodyReports last_page={this.props.last_page} url={this.props.url} />
            </div>
        )
    }
}