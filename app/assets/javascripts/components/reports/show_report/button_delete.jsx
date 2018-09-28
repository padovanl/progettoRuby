class ButtonDelete extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        const type = this.props.report ? this.props.report.reportable_type : null
        let id = this.props.report ? this.props.report.reportable_id : null
        let course_id = this.props.report.course ? this.props.report.course.id : null
        let link = null;

        switch(type) {
            case 'CourseQuestion':
                link = '/courses/'+ course_id +'/questions/' + id
                break;
            case 'CourseTip':
                link = ' /courses/'+ course_id +'/course_tips/' + id
                break;
            case 'Post':
                link = '/posts/' + id + '/?course_id='+course_id
                break;
            case 'Document':
                link = '/documents/' + id + '/?course_id='+course_id
                break;
            case 'Rep':
                link = '/reps/' +id
                break;
            case 'Comment':
                link = '/comments/' + id
                break;
        }

        return(
            <div className="columns">
                <div className="column is-1"></div>
                <div className="column has-text-centered">
                    <a className="button is-danger is-rounded" onClick={() => this.props.handleDelete(link)}>
                        <span className="icon is-warning"><i className="fas fa-trash-alt"></i></span>
                        <span className="is-danger">Elimina oggetto segnalato</span>
                    </a>
                </div>
                <div className="column is-1"></div>
            </div>
        )
    }

}