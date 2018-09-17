class HistoryTeacher extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr key={this.props.teacher.teacher_id}>
                <td className="has-text-centered"><a target="_blank" href={this.props.teacher.link_cv}>{this.props.teacher.name} {this.props.teacher.surname}</a></td>
            </tr>
        )
    }
}