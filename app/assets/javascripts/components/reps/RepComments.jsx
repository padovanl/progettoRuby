const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };



class RepComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueTextarea: '',
            message: '',
            error: ''
        };
        this.handleReply = this.handleReply.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeComment(e){
        this.setState({valueTextarea: e.target.value})
    }

    handleReply(){
        this.setState({valueTextarea: "Ciao "+this.props.user_name+", rispondo per quanto riguarda l'annuncio: "
            +this.props.title+""})
    }

    handleClick(e){
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

        console.log("Contenuto",e.target[0].value);
        const options = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
        };
        fetch('/send_email?course_id='+this.props.item.id+'&content='+e.target[0].value,options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Errore invio email");
                }
            })
            .then(this.setState({message: "Email inviata con successo!", error: ''}))
            .catch(e => {this.setState({error: e.toString(), message: ''},console.log("messaggio risp: ",e))});
    }

    render(){
        let invio_email;
        if (this.state.message !== '' || this.state.error !=='')
            invio_email= <div><font color="green">{this.state.message}</font><font color="red">{this.state.error}</font></div>;

        return (
            <section>

                {invio_email}

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
                        <p className="image is-32x32">
                            <img src={this.props.current_user_image}/>
                        </p>
                    </figure>
                    <form className="media-content" onSubmit={(e) => this.handleClick(e)}>
                        <div className="field">
                            <p className="control">
                                <textarea rows="3" className="textarea" value={this.state.valueTextarea} placeholder="Write email..." onChange={(e)=>this.handleChangeComment(e)}/>
                            </p>
                        </div>
                        <div className="field">
                            <div className="control has-icons-left">
                                <button className="button" type={"submit"}><span className="left-gap"> Send email</span></button>
                                <span className="icon is-small is-left">
                                        <a className="fab fa-telegram-plane"/>
                                    </span>
                            </div>
                        </div>
                    </form>
                </article>
            </section>
        )
    }

}