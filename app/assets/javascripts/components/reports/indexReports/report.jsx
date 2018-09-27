class Report extends React.Component{

    constructor(props){
        super(props);
    }




    render(){





        const action = this.props.report.action;
        const nome_corso = this.props.report.course.name;
        const id_corso = this.props.report.course.id;
        let notification_time = timeAgo(this.props.report.created_at) ;
        let type = this.props.report.reportable_type
        const report_id = this.props.report.id;
        let stile_background_notifica;
        let scritta_annuncio;

        if(this.props.report.read_at == null){
            stile_background_notifica = 'is-not-read-not'
        }else{
            stile_background_notifica = 'is-read-not'
        }

        let links = {}

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-lg fa-question-circle"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'CourseTip':
                type = 'suggerimento'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-lg fa-question-circle"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Post':
                type = 'post'
                link = '/publications/' + id_corso + '?post_id=' + this.props.report.reportable.post.id
                icon = <span className="icon has-text-link"><i className="fas fa-lg fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>del corso di {nome_corso}</div>
                break;
            case 'Document':
                type = 'documento'
                link = '/resources/' + id_corso + '?document_id=' + this.props.report.reportable.document.id
                icon = <span className="icon has-text-link"><i className="fas fa-lg fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>condiviso nel corso di {nome_corso}</div>
                break;
            case 'Rep':
                    if(this.props.report.reportable.rep.offer){
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-lg fa-book"></i></span>;
                        scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }else{
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-lg fa-book"></i></span>;
                        scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }
            case 'Comment':
                type = 'commento'
                link = '/publications/' + id_corso + '?comment_id=' + this.props.report.reportable.comment.id
                icon = <span className="icon has-text-link"><i className="fas fa-lg fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>del corso di {nome_corso}</div>
                break;
        }
        links[''+report_id.toString()+''] = link
        return(

            <tr key={report_id} className={stile_background_notifica}>
                    <td className="notification_text_column_mobile">
                        <a className="style_link_row" onClick={() => this.props.handleMarkAndRedirect(links[report_id], report_id)}>
                            <article className="media gap">
                                <figure className="media-left">
                                    <p className="image is-16x16  is-danger">
                                        <span className="icon has-text-danger"><i className="fas fa-bullhorn"></i></span>
                                    </p>
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        {scritta_annuncio}
                                    </div>
                                </div>
                            </article>
                        </a>
                    </td>
                    <td>
                        <article className="media gap">
                            <div className="media-content">
                                <div className="content">
                                    <div>
                                        {icon}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </td>
                    <td className="notification_text_column_mobile">
                        <article className="media gap">
                            <div className="media-content">
                                <div className="content">
                                    <div>
                                        {notification_time}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </td>
                    <td className="report_context_column_mobile">
                        <article className="media gap">
                            <div className="media-content">
                                <div className="content">
                                    <a className="button is-success" onClick={() => this.props.handleDelete(report_id)}>
                                            <span className="icon is-success"><i className="fas fa-check-circle"></i></span>
                                        <span className="is-success">Risolto</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </td>
                    <td className="report_context_column_mobile">
                        <article className="media gap">
                            <div className="media-content">
                                <div className="content">
                                    <a className="button is-warning" href={"/reports/" + report_id}>
                                        <span className="icon is-warning"><i className="fas fa-info-circle"></i></span>
                                        <span className="is-warning">Dettagli</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </td>
            </tr>
        )
    }
}