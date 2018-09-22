class TeacherSubtitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){

        let style = {
            paddingTop: 4
        };

        const subtitle = this.props.teacher != null ? <div className="is-size-5" style={style}>Insegnato attualmente da <a target="_blank" href={this.props.teacher.link_cv}>{this.props.teacher.name} {this.props.teacher.surname}</a></div> : null;
        return(
            <div>
                { this.props.teacher != null ? subtitle : 'Professore non ancora assegnato'}
            </div>
        )
    }
}