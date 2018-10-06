class Thesis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_tags: false
        };
        this.showTags = this.showTags.bind(this)
    }

    showTags(){
        this.setState((prevState)  => {
           return {show_tags: !prevState.show_tags}
        })
    }

    render(){
        const item = this.props.item;
        let tags = item.tags.map(tag => {
            return <div key={tag.id}>{tag.name}</div>
        });
        let show_tags='';
        if (this.state.show_tags===true)
            show_tags= 'is-active';
        else
            show_tags='';

        let style = {
            borderRadius: 15,
        };
        let linkDetails = '/theses/' + item.id;

        const content_overflow_hidden = {
            overflow: 'hidden'
        };

        return(
            <section className="card-tesi" >
                <div className="box ">
                    <div className="card">
                        <header className="myRow card-header ">

                                <div className="card-header-title has-icons-left " >
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-graduation-cap"/>
                                    </span>
                                    <a href={item.teacher.link_cv} className="left-gap">
                                        {item.teacher.surname} {item.teacher.name}:
                                    </a>
                                    <p className="left-gap">{item.title}</p>
                                </div>

                                <div className={"dropdown is-right "+show_tags}>
                                    <div className="dropdown-trigger">

                                        <a onClick={this.showTags} className="card-header-icon" aria-label="more options" aria-controls="dropdown-menu">
                                            <span className="icon" title="Guarda quali sono i tag relativi alla tesi!">
                                               <i className="fas fa-angle-down" aria-hidden="true"/>
                                            </span>
                                        </a>
                                    </div>

                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            {tags}
                                        </div>
                                    </div>
                                </div>
                        </header>

                        <div className="card-content" style={content_overflow_hidden}>
                            <div className="content">
                                {item.content}
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="card-footer-item ">
                                {item.teacher.name.toLowerCase() + "."+ item.teacher.surname.toLowerCase() +"@unife.it"}
                            </small>
                            <small className="card-footer-item ">
                                {(new  Date(Date.parse(item.created_at))).toLocaleDateString('it-IT', options)}
                            </small>
                            <small className="card-footer-item is-hidden-mobile">
                                <a className="button is-link is-small" style={style} href={linkDetails}>Vai alla pagina della tesi&nbsp;&nbsp;&nbsp;<i className="fas fa-search"/></a>
                            </small>
                        </div>

                    </div>
                </div>

            </section>
        )

    }

}