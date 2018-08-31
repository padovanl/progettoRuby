class AllStatisticCourse extends React.Component {
    render(){
        return(
            <div>
                <table className="table is-fullwidth is-striped is-centered">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <RowStatisticCourse />
                        <RowStatisticCourse />
                        <RowStatisticCourse />
                    </tbody>
                </table>
            </div>
        )
    }
}
