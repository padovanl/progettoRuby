class AllHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        var teachers = this.props.teacher_history.map((teacher) => {
            return(
                <HistoryTeacher teacher={teacher} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth is-centered">
                    <thead>
                    <tr>
                        <th>Professore</th>
                        <th>Anno</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers}
                    </tbody>
                </table>
            </div>
        )
    }

}