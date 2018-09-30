class NotificationNavbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){

        let style_padding = {
            paddingRight: 10,
        };

        let style_body_notification = {
            fontSize: 13
        };

        const style_dimension_tr = {
            width: 250
        };

        let style_color_time = {
            color: '#9e9e9e'
        }

        let a_capo ={
            whiteSpace: 'normal'
        }


        let links = {}
        const actor = this.props.notification.actor.name;
        const action = this.props.notification.action;
        let type = this.props.notification.notifiable_type
        const url_actor = this.props.notification.actor.avatar_url
        const nome_corso = this.props.notification.course.name;
        const id_corso = this.props.notification.course.id;
        let notification_time = timeAgo(this.props.notification.created_at) ;

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link " style={style_body_notification}><i className="fas fa-question-circle"></i></span>;
                scritta_annuncio = <span>{action}<span className="has-text-weight-bold"> {type}</span> nel corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                break;
            case 'CourseTip':
                type = 'suggerimento'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-lightbulb"></i></span>;
                scritta_annuncio = <span>{action}<span className="has-text-weight-bold"> {type}</span> nel corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                break;
            case 'Post':
                type = 'post'
                link = '/publications/' + id_corso + '?post_id=' + this.props.notification.notifiable.post.id
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <span>{action}<span className="has-text-weight-bold"> {type}</span> nel corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                break;
            case 'Rep':
                if(this.props.notification.notifiable.rep.offer){
                    type = 'ripetizioni'
                    link = '/reps'
                    icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-book"></i></span>;
                    scritta_annuncio = <span>offre <span className="has-text-weight-bold"> {type} </span>per il corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                    break;
                }else{
                    type = 'ripetizioni'
                    link = '/reps'
                    icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-book"></i></span>;
                    scritta_annuncio = <span>cerca <span className="has-text-weight-bold"> {type} </span>per il corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                    break;
                }
            case 'Document':
                type = 'documento'
                link = '/resources/' + id_corso + '?document_id=' + this.props.notification.notifiable.document.id
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-file-alt"></i></span>;
                scritta_annuncio = <span>{action}<span className="has-text-weight-bold"> {type} </span>per il corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                break;
            case 'Comment':
                type = ''
                link = '/publications/' + id_corso + '?comment_id=' + this.props.notification.notifiable.comment.id
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-comment-alt"></i></span>;
                scritta_annuncio = <span>ha <span className="has-text-weight-bold"> {action}</span> un post nel corso di {nome_corso}<div className="level"><span className="level-left">{icon}</span><span className="level-right" style={style_color_time}>{notification_time}</span></div></span>
                break;
        }

        links[''+this.props.notification.id.toString()+''] = link

        return(

    <div className="navbar-item columns" style={a_capo}>
        <div className="column"></div>
        <a className="is-not-read" onClick={() => this.props.handleMarkAndRedirect(links[this.props.notification.id], this.props.notification.id)}>
        <article className="media gap">
            <figure className="media-left">
            <p className="image is-24x24">
                <img src={url_actor}/>
            </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <div style={style_dimension_tr} className="a_capo">
                        <div className="has-text-weight-bold">{actor}</div>
                            {scritta_annuncio}
                    </div>
                </div>
            </div>
        </article>
        </a>
        <div className="column"></div>
    </div>
        )
    }
}