class Reporter extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        const url_actor = this.props.reporter.user_of_report.avatar_url
        const name_actor = this.props.reporter.user_of_report.name
        const reason = this.props.reporter.reason

        return(
            <tr key={this.props.reporter.id}>
                <td>
                        <article className="media gap">
                            <figure className="media-left">
                                <p className="image is-16x16">
                                    <img className="is-rounded" src={url_actor}/>
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    {name_actor}
                                </div>
                            </div>
                        </article>
                </td>
                <td>
                    <article className="media gap">
                        <div className="media-content">
                            <div className="content">
                                <div>
                                    {reason}
                                </div>
                            </div>
                        </div>
                    </article>
                </td>
            </tr>
        )
    }

}