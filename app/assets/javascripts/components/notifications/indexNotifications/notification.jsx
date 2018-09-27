class Notification extends React.Component{

    constructor(props){
        super(props);
    }

    handleMarkAndRedirect(redirect_url, id){
        let linkUpdate = '/mark_as_read/' + id;
                fetch(linkUpdate,
                    {
                        method: 'PUT',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then((response) => {
                    return response.json()
                })
                    .then((notification) => {
                        if (notification.error) {
                            alert("Errore!")
                        } else {
                            window.location.href = redirect_url;
                        }
                    })
    }


    render(){

        let links = {}
        const actor = this.props.notification.actor.name;
        const action = this.props.notification.action;
        const nome_corso = this.props.notification.course.name;
        const id_corso = this.props.notification.course.id;
        let notification_time = timeAgo(this.props.notification.created_at) ;
        let type = this.props.notification.notifiable_type
        const url_actor = this.props.notification.actor.avatar_url
        const id_notification = this.props.notification.id;
        let stile_background_notifica;
        let scritta_annuncio;

        if(this.props.notification.read_at == null){
            stile_background_notifica = 'is-not-read-not'
        }else{
            stile_background_notifica = 'is-read-not'
        }

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-question-circle"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{actor} </span>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'CourseTip':
                type = 'suggerimento'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-glasses"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{actor} </span>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Post':
                type = 'post'
                link = '/publications/' + id_corso + '?post_id=' + this.props.notification.notifiable.post.id
                icon = <span className="icon has-text-link"><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{actor} </span>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Rep':
                    if(this.props.notification.notifiable.rep.offer){
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-book"></i></span>;
                        scritta_annuncio = <div><span className="has-text-weight-bold">{actor} </span> offre <span className="has-text-weight-bold style_padding_row"> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }else{
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-book"></i></span>;
                        scritta_annuncio = <div><span className="has-text-weight-bold">{actor} </span> cerca <span className="has-text-weight-bold style_padding_row"> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }
            case 'Document':
                type = 'documento'
                link = '/resources/' + id_corso + '?document_id=' + this.props.notification.notifiable.document.id
                icon = <span className="icon has-text-link"><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{actor} </span>{action}<span className="has-text-weight-bold style_padding_row"> {type}</span>per il corso di {nome_corso}</div>
                break;
        }

        links[''+this.props.notification.id.toString()+''] = link
        new_notification = this.props.notification.read_at == null ? <span className="icon has-text-danger"><i className="fas fa-dot-circle"></i></span> : <span className="icon"><i className="fas fa-dot-circle"></i></span>;

        let style1 = {

        };


        return(

            <tr key={this.props.notification.id} className={stile_background_notifica}>
                <td>
                    <span className="image is-24x24"><img src={url_actor} className="is-rounded"/></span>
                </td>
                    <td className="is-hidden-touch">
                        <a className="style_link_row" onClick={() => this.props.handleMarkAndRedirect(links[this.props.notification.id], id_notification)}>
                            {scritta_annuncio}
                        </a>
                    </td>
                    <td className="is-hidden-desktop notification_text_column_mobile">
                        <a className="style_link_row" onClick={() => this.props.handleMarkAndRedirect(links[this.props.notification.id], id_notification)}>
                            {scritta_annuncio}
                        </a>
                    </td>
                    <td>{icon}</td>
                    <td className="notification_text_column_mobile">{notification_time}</td>
                    <td>{new_notification}</td>
            </tr>
        )
    }
}