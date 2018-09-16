class NotificationNavbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){

        let style_padding = {
            paddingRight: 10,
        };

        const actor = this.props.notification.actor.name;
        const action = this.props.notification.action;
        let type = this.props.notification.notifiable_type
        const url_actor = this.props.notification.actor.avatar_url

        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                break;
        }

        return(

    <div className="navbar-item is-centered">
        <article className="media gap">
            <figure className="media-left">
            <p className="image is-19x19">
                <img src={url_actor}/>
            </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <div>
                        <div className="has-text-weight-bold">{actor} </div>
                        {action} <span className="has-text-weight-bold" style={style_padding}>{type}</span>
                    </div>
                </div>
            </div>
        </article>
    </div>
        )
    }
}