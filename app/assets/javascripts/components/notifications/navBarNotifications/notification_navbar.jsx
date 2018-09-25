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
            width: 350
        };

        let style_color_time = {
            color: '#9e9e9e'
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
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-question-circle"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'CourseTip':
                type = 'suggerimento'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-glasses"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span><div> nel corso di {nome_corso}</div><div className="has-text-right" style={style_color_time}>{notification_time}</div></div>
                break;
            case 'Post':
                type = 'post'
                link = '/publications/' + id_corso + '?post_id=' + this.props.notification.notifiable.post.id
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Rep':
                if(this.props.notification.notifiable.rep.offer){
                    type = 'ripetizioni'
                    link = '/reps'
                    icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-book"></i></span>;
                    scritta_annuncio = <div>offre <span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                    break;
                }else{
                    type = 'ripetizioni'
                    link = '/reps'
                    icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-book"></i></span>;
                    scritta_annuncio = <div>cerca <span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                    break;
                }
            case 'Document':
                type = 'documento'
                link = '/resources/' + id_corso + '?document_id=' + this.props.notification.notifiable.document.id
                icon = <span className="icon has-text-link" style={style_body_notification}><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                break;
        }

        links[''+this.props.notification.id.toString()+''] = link

        return(

    <div className="navbar-item is-centered">
        <article className="media gap">
            <figure className="media-left">
            <p className="image is-24x24">
                <img src={url_actor}/>
            </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <div>
                        <div className="has-text-weight-bold">{actor}</div>
                        {scritta_annuncio}
                    </div>
                </div>
            </div>
        </article>
    </div>
        )
    }
}