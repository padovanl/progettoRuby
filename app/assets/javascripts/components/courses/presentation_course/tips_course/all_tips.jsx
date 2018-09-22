class AllTips extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        var tips = this.props.tips.map((courseTip) => {
            return(
                <CourseTip courseTip={courseTip}
                                user_id={this.props.user_id}
                                handleDelete={this.props.handleDelete}
                                handleUpdate={this.props.handleUpdate}
                                show_details = {this.props.show_details}
                                handleReport = {this.props.handleReport} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth is-centered">
                    <thead>
                    <tr>
                        <th className="question-text-column">Suggerimento</th>
                        { this.props.show_details ? <th className="details-column">Dettagli</th> : null }
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tips}
                    </tbody>
                </table>
            </div>
        )
    }

}