
class MainThesisTags extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <BodyThesisTags thesis_id={this.props.thesis_id} />
            </div>
        )
    }
}