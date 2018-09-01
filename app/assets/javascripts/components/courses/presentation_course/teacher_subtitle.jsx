class TeacherSubtitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const subtitle = this.props.teacher != null ? <h6>Insegnato attualmente da <a target="_blank" href={this.props.teacher.link_cv}>{this.props.teacher.name} {this.props.teacher.surname}</a></h6> : null;
        return(
            <div>
                { this.props.teacher != null ? subtitle : 'Professore non ancora assegnato'}
            </div>
        )
    }
}