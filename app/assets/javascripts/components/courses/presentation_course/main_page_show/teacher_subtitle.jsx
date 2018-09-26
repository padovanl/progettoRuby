class TeacherSubtitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const subtitle = this.props.teacher != null ? <div className="is-size-5 teacher_subtitle_course">Insegnato attualmente da <a target="_blank" href={this.props.teacher.link_cv}>{this.props.teacher.name} {this.props.teacher.surname}</a></div> : null;
        return(
            <div>
                { this.props.teacher != null ? subtitle : <div className="is-size-5 teacher_subtitle_course">Professore non ancora assegnato</div>}
            </div>
        )
    }
}