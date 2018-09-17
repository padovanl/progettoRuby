class AllHistoryTeachers extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        var teachers = this.props.teachers.map((teacher) => {
            return(
                <HistoryTeacher teacher={teacher} />
            )
        })

        return(
            <div>
                <table className="table is-hoverable is-fullwidth is-centered">
                    <tbody>
                    {teachers}
                    </tbody>
                </table>
            </div>
        )
    }

}