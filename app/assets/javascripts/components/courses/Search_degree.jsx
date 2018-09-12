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
        console.log("token: ", token, "refreshToken; ", refreshToken);
        getDegreesName('')
            .then(data => {
                console.log("sto per aggiornare: "+data);
                this.setState({degreesType: data});
            })
            .catch(this.handleError);
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("nextState: ", nextState, this.state.degrees, this.state.chooseDegree);
        if((nextProps.selectType === '- Select -') &&
            ( nextProps.selectName === '- Select -')
            && this.state.degreesType === nextState.degreesType){
            console.log("torna falso");
            return false
        }
        console.log("torna true");
        return true;
    }

    componentDidUpdate(nextProps, nextState) {
        console.log("componentDidUpdate");
    }

    selectTypeChanged(e){
        const value = e.target.value;
        console.log("selectType cliccato, si cercano i degree json: "+ value);
        getDegreesName('degree='+value)
            .then(data => {
                console.log("sto per aggiornare: "+data);
                this.setState({degrees: data, chooseDegree: ''});
                this.props.setSelectType(value);
            })
            .catch(this.handleError);
        console.log("degrees dopo setstate: "+ this.state.degrees)
    }


    selectDegreeChanged(e){
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
        console.log("degrees: "+ this.state.degrees);
        let optionsDegree='';
        if (this.state.degrees !== []){
            optionsDegree = this.state.degrees.map((opt) => {
                console.log("key: "+opt.id);
                return(
                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                )
            });
        }


        return(
            <section>
                <hr/>

                <div className={'myRow gap'}>
                    <div className={'columns'}>
                        <div className=' myColumn-sm '>
                            <select required className='mySelect gap' onClick={(e) => this.selectTypeChanged(e)}>
                                <option key={'- Select -'}>- Select -</option>
                                {optionsSelectTypes}
                            </select>
                        </div>
                        <div className={'myColumn-sm '+this.state.chooseDegree}>
                            <select required className='mySelect gap' onClick={(e) => this.selectDegreeChanged(e)}>
                                <option key={'- Select -'}>- Select -</option>
                                {optionsDegree}
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        )


    }




}