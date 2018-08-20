

class SearchThesisByProf extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.temp = [];
        this.change = this.change.bind(this);
    }



    change(event){
        this.setState({value: event.target.value});
        this.props.searchByProf(event.target.value);
    }

    getTeachers(){
        fetch('/api/v1/teachers.json')
            .then((response) => {return response.json()})
            .then((data) => {this.temp = data});
    }

    render(){
        this.getTeachers();
        var teachersList = this.temp;


        return(
            <div className="columns">
                <div className="column">
                    <div className="select">
                        <select id="lang" onChange={this.change} value={this.state.value} className="input is-medium">
                            <option value="0">Tutti</option>
                            {teachersList.map(function(t){
                                return <option value={t.id}>{t.name}&nbsp;{t.surname}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="column"></div>
            </div>

        );
    }
}