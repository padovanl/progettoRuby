const AllTags = (props) => {

    var tags = props.tags.map((tag) => {
        return(
            <Tag tag={tag} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
        )
    })

    return(
        <div>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Opzioni</th>
                </tr>
                </thead>
                <tbody>
                {tags}
                </tbody>
            </table>

        </div>
    )
}