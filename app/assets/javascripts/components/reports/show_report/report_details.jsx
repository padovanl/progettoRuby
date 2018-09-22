class ReportDetails extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        let type = this.props.report_type
        switch(type) {
            case 'CourseQuestion':
                type = 'Domanda'
                link = '/courses/' + this.props.course_details.id
                nome_corso = this.props.course_details.name
                anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                contenuto = this.props.report_details.question
                break;
            case 'CourseTip':
                type = 'Suggerimento'
                link = '/courses/' + this.props.course_details.id
                nome_corso = this.props.course_details.name
                anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                contenuto = this.props.report_details.tip
                break;
            case 'Post':
                type = 'Post'
                link = '/publications'
                nome_corso = this.props.course_details.name
                anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                contenuto = this.props.report_details.post.message
                break;
            case 'Document':
                type = 'Documento'
                link = '/resources'
                nome_corso = this.props.course_details.name
                anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                contenuto = this.props.report_details.document.filename
                break;
            case 'Rep':
                if(this.props.report_details.rep.offer){
                    type = 'Offerta Ripetizione'
                    link = '/resources'
                    nome_corso = this.props.course_details.name
                    anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                    contenuto = this.props.report_details.rep.description
                    break;
                }else{
                    type = 'Cerca Ripetizione'
                    link = '/resources'
                    nome_corso = this.props.course_details.name
                    anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                    contenuto = this.props.report_details.rep.description
                    break;
                }
            case 'Comment':
                type = 'Commento'
                link = '/publications'
                nome_corso = this.props.course_details.name
                anno_corso = this.props.course_details.year == 1 ? "Primo" : "Secondo"
                contenuto = this.props.report_details.document.filename
                break;
        }

        return(
            <div className="columns">
                <div className="column is-1"></div>
                        <div className="column">
                    <h3 className="title is-5">Descrizione</h3>
                    <table className="table is-centered">
                        <thead>
                        <tr><th></th><th></th></tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="has-text-weight-bold">Corso</td>
                            <td>{nome_corso}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-bold">Anno Corso</td>
                            <td>{anno_corso}</td>
                        </tr>
                        <tr>
                        <td className="has-text-weight-bold"> Oggetto Segnalato</td>
                        <td>{type}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-bold">Contenuto</td>
                            <td>{contenuto}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="column is-1"></div>
            </div>
        )
    }
}