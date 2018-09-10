class BodySurvey2 extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        let formFields = {};
        //elenco di voti da 18 a 31
        var voteList = [];
        for (var i = 18; i <= 31; i++) {
            voteList.push(i);
        }

        //array associativo con 1 - insufficiente -> 4 - buono
        var lista_giudizi = ['insufficiente', 'sufficiente','discreto','buono','molto buono' ];

// course rate sarebbe il voto conseguito

        return(
            <div>
                <table className="table is-hoverable is-centered">
                    <tbody>
                    <tr>
                        <td>
                            <label className="label">Voto conseguito</label>
                        </td>
                        <td>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select ref={input => formFields.course_rate = input}>
                                        {voteList.map(function(vote){
                                            return <option value={vote}>{vote}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}