class ReportDetails extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        const label_studenti_passati = "Studenti che hanno passato l'esame";
        //const valore_studenti_passati = this.props.statistic_values.passed_number;


        let type = this.props.report_type;
        switch(type) {
            case 'CourseQuestion':
                type = 'domanda'
                link = '/courses/'
                break;
        }

        return(
            <div>
                <div>
                    Descrizione
                </div>
                <table className="table is-fullwidth is-centered">
                    <thead>
                    <tr>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Corso</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Anno</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Tipo di segnalazione</td>
                        <td>{type}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}