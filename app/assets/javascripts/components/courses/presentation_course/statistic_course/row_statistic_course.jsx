class RowStatisticCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <td className="statistic-label">{this.props.title_label}</td>
                <td className="margin-statistic-value">{this.props.statistic_value}</td>
            </tr>
        )
    }
}