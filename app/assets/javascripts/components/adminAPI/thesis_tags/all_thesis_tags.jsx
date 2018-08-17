

class AllThesisTags extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var tags = this.props.tags.map((thesisTag) => {
            return(
                <ThesisTag thesisTag={thesisTag} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>Tag</th>
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

}