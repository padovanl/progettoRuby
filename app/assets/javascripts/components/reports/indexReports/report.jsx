class Report extends React.Component{

    constructor(props){
        super(props);
    }




    render(){

        let style_not_read = {
            backgroundColor: 'rgb(237, 242, 250)'
        };

        let style_read = {
            backgroundColor: 'white'
        };

        let style_time ={
            fontFamily: 'Arial',
            color: 'black'
        };

        let style_link_row = {
            textDecoration: 'none',
            color: 'black'
        };

        let style_padding = {
            paddingRight: 10,
        };



        const action = this.props.report.action;
        const nome_corso = this.props.report.course.name;
        const id_corso = this.props.report.course.id;
        let notification_time = timeAgo(this.props.report.created_at) ;
        let type = this.props.report.reportable_type
        const report_id = this.props.report.id;
        let stile_background_notifica;
        let scritta_annuncio;

        if(this.props.report.read_at == null){
            stile_background_notifica = style_not_read
        }else{
            stile_background_notifica = style_read
        }

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-question-circle"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'CourseTip':
                type = 'suggerimento'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-question-circle"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Post':
                type = 'post'
                link = '/publications'
                icon = <span className="icon has-text-link"><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>del corso di {nome_corso}</div>
                break;
            case 'Document':
                type = 'documento'
                link = '/resources'
                icon = <span className="icon has-text-link"><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>condiviso nel corso di {nome_corso}</div>
                break;
            case 'Rep':
                    if(this.props.report.reportable.rep.offer){
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-book"></i></span>;
                        scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }else{
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-book"></i></span>;
                        scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }
            case 'Comment':
                type = 'commento'
                link = '/publications'
                icon = <span className="icon has-text-link"><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
        }

        return(

            <tr key={report_id} style={stile_background_notifica}>
                    <td>
                        <a style={style_link_row} onClick={() => this.props.handleMarkAndRedirect(link, report_id)}>
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
                    <td>
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
                    <td>
                        <article className="media gap">
                            <div className="media-content">
                                <div className="content">
                                    <a className="tags has-addons" onClick={() => this.props.handleDelete(report_id)}>
                                        <span className="tag is-success">Risolto</span>
                                        <span className="tag is-success"><i className="fas fa-check"></i></span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </td>
                    <td>
                        <article className="media gap">
                            <div className="media-content">
                                <div className="content">
                                    <a className="tags has-addons" href={"/reports/" + report_id}>
                                        <span className="tag is-warning">Dettagli</span>
                                        <span className="tag is-warning"><i className="fas fa-info-circle"></i></span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </td>
            </tr>
        )
    }
}