class AddTagsThesis extends React.Component {

    render(){


        return(
            <div className="modal"id="addTagsThesisModal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Aggiungi tag</p>
                        <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Save changes</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}

