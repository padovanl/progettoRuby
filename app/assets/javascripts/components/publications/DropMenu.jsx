class DropMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    toggleMenu(){
        this.setState((prevState) => {
            return {isActive: !prevState.isActive}
        })
    }

    render() {
        const { cancella, id, risorsa, can_delete, course_id } = this.props
        const deleteButton = (<a href="#" className="dropdown-item" onClick={ (e) => cancella(e, id) }>
                                Cancella { risorsa } </a>)

        let linkReport = risorsa == 'post' ? '/report_post/' + id + '?course_id=' + course_id : '/report_comment/' + id + '?course_id=' + course_id;

        return (
            <div className={ "dropdown is-right " + (this.state.isActive ? "is-active" : "")} >
                <div className="dropdown-trigger">
                    <div className="drop-menu" aria-haspopup="true" aria-controls="dropdown-menu6" onClick={this.toggleMenu.bind(this)}>
                        <span className="icon is-small">
                            <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                    <div className="dropdown-content">
                        <a className="dropdown-item" onClick={() => handleReport(linkReport)}>
                            Segnala
                        </a>
                        {can_delete ? <hr className="dropdown-divider" /> : ""}
                        {can_delete ? deleteButton : ""}
                    </div>
                </div>
            </div>
        );
    }
}