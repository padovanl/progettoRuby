const AllTeachers = (props) => {

    var teachers = props.teachers.map((teacher) => {
        return(
            <Teacher teacher={teacher} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
        )
    })

    let style = {
        width: "15%",
    };
    return(
        <div>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th style={style}>Nome</th>
                    <th style={style}>Cognome</th>
                    <th>Link</th>
                    <th>Opzioni</th>
                </tr>
                </thead>
                <tbody>
                {teachers}
                </tbody>
            </table>
        </div>
    )
}