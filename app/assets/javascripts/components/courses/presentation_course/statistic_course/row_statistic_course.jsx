class RowStatisticCourse extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        let style= {
            verticalAlign: 'middle'
        };

        return(
            <tr>
                <td className="statistic-label has-text-weight-bold ">{this.props.title_label}</td>
                <td className="margin-statistic-value has-text-black" style={style}>{this.props.statistic_value}</td>
            </tr>
        )
    }
}