class Notification extends React.Component{

    constructor(props){
        super(props);
    }


    render(){

        let style_time ={
            fontFamily: 'Arial',
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
        let notification_time = timeAgo(this.props.notification.updated_at) ;
        let type = this.props.notification.notifiable_type
        const url_actor = this.props.notification.recipient.avatar_url

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/' + id_corso
                icon = <span className="icon has-text-link"><i className="fas fa-question-circle"></i></span>;
                break;
        }

        new_notification = this.props.notification.read_at == null ? <span className="icon has-text-danger"><i className="fas fa-dot-circle"></i></span> : null;

        return(

            <tr key={this.props.notification.id}>
                    <td>
                        <a href={link} style={style_link_row}>
                            <article className="media gap">
                                <figure className="media-left">
                                    <p className="image is-16x16">
                                        <img className="is-rounded" src={url_actor}/>
                                    </p>
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <div>
                                               <span className="has-text-weight-bold">{recipient} </span>{action}<span className="has-text-weight-bold" style={style_padding}> {type}</span>nel corso di {nome_corso}
                                        </div>
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