const AllTeachers = (props) => {

    var teachers = props.teachers.map((teacher) => {
        return(
            <Teacher teacher={teacher} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
        )
    })

    return(
        <div>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Cognome</th>
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