const AllTheses = (props) => {

    var theses = props.theses.map((thesis) => {
        return(
            <Thesis thesis={thesis} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
        )
    })

    return(
        <div>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Titolo</th>
                    <th>Descrizione</th>
                    <th>Professore</th>
                    <th>Opzioni</th>
                </tr>
                </thead>
                <tbody>
                {theses}
                </tbody>
            </table>
        </div>
    )
}