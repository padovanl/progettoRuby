const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };



class RepComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueTextarea: '',
        };
        this.handleReply = this.handleReply.bind(this)
    }

    handleChangeComment(e){
        this.setState({valueTextarea: e.target.value})
    }

    handleReply(){
        this.setState({valueTextarea: "Ciao "+this.props.user_name+", rispondo per quanto riguarda l'annuncio: "
            +this.props.title+""})
    }

    render(){
        return (
            <section>
                <nav className="level is-mobile gap">
                    <div className={"level-left"}/>
                    <div className="level-right">
                        <a className="level-item" aria-label="reply" onClick={() => this.handleReply(this.props.title, this.props.item.user.name.toString())}>
                                                    <span className="icon is-small" title={"Reply"} >
                                                      <i className="fas fa-reply" aria-hidden="true"/>
                                                    </span>
                        </a>
                        <small>
                            · {(new  Date(Date.parse(this.props.item.created_at))).toLocaleDateString('it-IT', options)}
                        </small>
                    </div>
                </nav>
                <article className="media gap">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img >{this.props.current_user_image}</img>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="field">
                            <p className="control">
                                <textarea className="textarea" value={this.state.valueTextarea} placeholder="Add a comment..." onChange={(e)=>this.handleChangeComment(e)}/>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button">Post comment</button>
                            </p>
                        </div>
                    </div>
                </article>
            </section>
        )
    }

}