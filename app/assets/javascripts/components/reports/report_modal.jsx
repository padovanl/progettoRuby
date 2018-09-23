class ReportModal extends React.Component {

    constructor(props){
        super(props);
    }
    render(){

        var reasons = ['Contenuto offensivo', 'Contenuto non consono','Altro'];
        let formFields = {};

        return(
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{this.props.title}</p>
                            <button className="delete" aria-label="close"  onClick={() => this.props.disableModal()}></button>
                        </header>
                        <section className="modal-card-body">
                            <br/>
                            <div className="columns">
                                <div className="column is-2"></div>
                                <div className="field is-horizontal column">
                                    <div className="field-label">
                                        <label className="label">Motiva la segnalazione</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field is-narrow">
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select ref={input => formFields.reason = input}>
                                                        {reasons.map(function(reason, i){
                                                            return <option key={i} value={reason}>{reason}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-1"></div>
                            </div>
                        </section>
                        <footer className="modal-card-foot buttons is-centered">
                            <button className="button is-success is-rounded" onClick={() => handleReport(this.props.linkReport, formFields.reason.value)}>Segnala</button>
                            <button className="button is-danger is-rounded" onClick={() => this.props.disableModal()}>Indietro</button>
                        </footer>
                    </div>
        )
    }
}