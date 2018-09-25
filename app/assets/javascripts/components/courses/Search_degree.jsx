class Search_degree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chooseDegree: 'is-invisible',
            degreesType: [],
            degrees: []
        };

        this.selectTypeChanged = this.selectTypeChanged.bind(this);
        this.selectDegreeChanged = this.selectDegreeChanged.bind(this)
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        getDegreesName('')
            .then(data => {
                this.setState({degreesType: data});
            })
            .catch(this.handleError);
    }

    shouldComponentUpdate(nextProps, nextState){
        if((nextProps.selectType === '- Select -') &&
            ( nextProps.selectName === '- Select -')
            && this.state.degreesType === nextState.degreesType){
            return false
        }
        return true;
    }


    selectTypeChanged(e){
        if(e.target.value === '- Select -')
            return false;

        const value = e.target.value;
        getDegreesName('degree='+value)
            .then(data => {
                this.setState({degrees: data, chooseDegree: ''});
                this.props.setSelectType(value);
            })
            .catch(this.handleError);
    }


    selectDegreeChanged(e){
        if(e.target.value === '- Select -')
            return false;

        const value = e.target.value; //new name of select degree
        e.preventDefault();
        if (value !== this.props.selectName){
            this.props.resetAdvancedSearch();
            this.props.onSubmit(value);
        }
    }

    render(){

        //########### TYPE #############
        let optionsSelectTypes = this.state.degreesType.map((opt) => {
            return(
                <option key={opt.tipo} value={opt.tipo}>{opt.tipo}</option>
            )
        });

        //########### NAME #############
        let optionsDegree='';
        if (this.state.degrees !== []){
            optionsDegree = this.state.degrees.map((opt) => {
                return(
                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                )
            });
        }

        let selectType;
        if (this.props.selectType === ''){
            selectType = 'is-invisible'
        }
        else selectType='';

        return(
            <section className="search-degree">
                <hr/>

                <div className={'myRow gap'}>
                    <div className={'columns'}>
                        <div className=' myColumn-sm '>
                            <div className="select gap">
                                <select required  onChange={(e) => this.selectTypeChanged(e)}
                                        value={this.props.selectType ? this.props.selectType : ''}
                                >
                                    <option key={'- Select -'} >- Select -</option>
                                    {optionsSelectTypes}
                                </select>
                            </div>
                        </div>

                        <div className={'myColumn-sm '+this.state.chooseDegree}>
                            <div className={"select gap "+ selectType}>
                                <select required onChange={(e) => this.selectDegreeChanged(e)}
                                        value={this.props.selectName ? this.props.selectName : '' }
                                >
                                    <option key={'- Select -'}>- Select -</option>

                                    {optionsDegree}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )


    }




}