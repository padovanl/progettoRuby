class HistoryTeacher extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr key={this.props.teacher.teacher_id}>
                <td><a target="_blank" href={this.props.teacher.teacher.link_cv}>{this.props.teacher.teacher.name} {this.props.teacher.teacher.surname}</a></td>
                <td>{this.props.teacher.year}</td>
            </tr>
        )
    }
}