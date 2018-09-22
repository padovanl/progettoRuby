class AllStatisticCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        const label_studenti_passati = "Studenti che hanno passato l'esame";
        const label_voto_medio = "Voto medio";
        const label_qualità_materiale = "Qualità del materiale fornito";
        const label_qualità_spiegazione = "Chiarezza spiegazione del docente";
        const label_numero_tentativi = "Numero tentativi medio per passare l'esame";
        const label_numero_giorni_studio = "Numero di giorni medi di studio";


        const valore_studenti_passati = this.props.statistic_values.passed_number;
        const valore_voto_medio = this.props.statistic_values.course_rate;
        const valore_qualità_materiale = this.props.statistic_values.material_quality;
        const valore_qualità_spiegazione =this.props.statistic_values.explanation;
        const valore_numero_tentativi = this.props.statistic_values.average_attempts;
        const valore_numero_giorni_studio = this.props.statistic_values.average_days;



        return(
            <div>
                <table className="table is-fullwidth is-striped is-centered">
                    <tbody>
                        <RowStatisticCourse  title_label={label_studenti_passati} statistic_value={valore_studenti_passati}/>
                        <RowStatisticCourse  title_label={label_voto_medio} statistic_value={valore_voto_medio}/>
                        <RowStatisticCourse  title_label={label_qualità_materiale} statistic_value={valore_qualità_materiale}/>
                        <RowStatisticCourse  title_label={label_qualità_spiegazione} statistic_value={valore_qualità_spiegazione}/>
                        <RowStatisticCourse  title_label={label_numero_tentativi} statistic_value={valore_numero_tentativi}/>
                        <RowStatisticCourse  title_label={label_numero_giorni_studio} statistic_value={valore_numero_giorni_studio}/>
                    </tbody>
                </table>
            </div>
        )
    }
}
