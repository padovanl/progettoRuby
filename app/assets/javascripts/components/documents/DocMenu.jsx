class DocMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    toggleMenu(){
        this.setState((prevState) => {
            return { isActive: !prevState.isActive }
        })
    }

    render() {
        const { cancella, id, risorsa, can_delete } = this.props;
        const deleteButton = (<a href="#" className="dropdown-item"
                                 onClick={ (e) => cancella(e, id) }>
                                Cancella { risorsa }
                                </a>);
        return (
            <div className={ "dropdown is-right " + (this.state.isActive ? "is-active" : "")} >
                <div className="dropdown-trigger">
                    <div className="drop-menu" aria-haspopup="true" aria-controls="dropdown-menu6"
                         onClick={this.toggleMenu.bind(this)}>
                        <span className="icon is-small">
                            <i className="fas fa-ellipsis-h" aria-hidden="true" />
                        </span>
                    </div>
                </div>
                <div className="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">Segnala</a>
                        { can_delete ? <hr className="dropdown-divider" /> : "" }
                        { can_delete ? deleteButton : "" }
                    </div>
                </div>
            </div>
        );
    }
}