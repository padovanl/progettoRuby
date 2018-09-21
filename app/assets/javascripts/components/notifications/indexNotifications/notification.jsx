class Notification extends React.Component{

    constructor(props){
        super(props);
    }

    handleMarkAndRedirect(redirect_url, id){
        console.log(redirect_url)
        // /api/v1/users/:user_id/user_courses/:id(.:format)
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



        const recipient = this.props.notification.recipient.name;
        const action = this.props.notification.action;
        const nome_corso = this.props.notification.course.name;
        const id_corso = this.props.notification.course.id;
        let notification_time = timeAgo(this.props.notification.created_at) ;
        let type = this.props.notification.notifiable_type
        const url_actor = this.props.notification.recipient.avatar_url
        const id_notification = this.props.notification.id;
        let stile_background_notifica;
        let scritta_annuncio;

        if(this.props.notification.read_at == null){
            stile_background_notifica = style_not_read
        }else{
            stile_background_notifica = style_read
        }

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-question-circle"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{recipient} </span>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'CourseTip':
                type = 'suggerimento'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-glasses"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{recipient} </span>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Post':
                type = 'post'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-envelope"></i></span>;
                scritta_annuncio = <div><span className="has-text-weight-bold">{recipient} </span>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}</div>
                break;
            case 'Rep':
                    if(this.props.notification.notifiable.rep.offer){
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-book"></i></span>;
                        scritta_annuncio = <div><span className="has-text-weight-bold">{recipient} </span> offre <span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }else{
                        type = 'ripetizioni'
                        link = '/reps'
                        icon = <span className="icon has-text-link"><i className="fas fa-book"></i></span>;
                        scritta_annuncio = <div><span className="has-text-weight-bold">{recipient} </span> cerca <span className="has-text-weight-bold" style={style_padding}> {type}</span>per il corso di {nome_corso}</div>
                        break;
                    }
        }

        new_notification = this.props.notification.read_at == null ? <span className="icon has-text-danger"><i className="fas fa-dot-circle"></i></span> : <span className="icon"><i className="fas fa-dot-circle"></i></span>;

        return(

            <tr key={this.props.notification.id} style={stile_background_notifica}>
                    <td>
                        <a href="#" style={style_link_row} onClick={() => this.props.handleMarkAndRedirect(link, id_notification)}>
                            <article className="media gap">
                                <figure className="media-left">
                                    <p className="image is-16x16">
                                        <img className="is-rounded" src={url_actor}/>
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
                                    <div style={style_time}>
                                        {new_notification}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </td>
            </tr>
        )
    }
}