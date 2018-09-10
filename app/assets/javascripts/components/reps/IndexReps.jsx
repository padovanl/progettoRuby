function updateIndexReps(URL, reps){
    this.setState({url: URL, reps: reps, page:1})
}

class IndexReps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reps: [],
            url: '',
            page:1,
            disabledNext: false,
            search: '',
            tabs_activate: 'is-activate',
            courseNames:[]
        };
        this.getAllReps = this.getAllReps.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewRep = this.addNewRep.bind(this);
        updateIndexReps = updateIndexReps.bind(this);
    }

    componentWillMount(){
        this.getAllReps();
        getNames('Course')
            .then(data => {
                this.setState({courseNames: data})
            })
            .catch((e) => console.log(e))
    }


    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }

    onChangePage() {
        this.setState({page: this.state.page +=1},this.getAllReps());
    }

    showModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }

    closeModal() {
        this.setState({modalState: false});
    }

    getAllReps(){
        getItems(updateUrlReps(this.props.url, this.state.url, this.state.page))
            .then(data => {
                if (data.length === 0){
                    this.setState({disabledNext: true})
                }
                else{
                    this.setState({reps: this.state.reps.concat(data)})
                }
            })
            .catch(e => console.log(e)
        )
    }

    addNewRep(rep){
        this.setState((prevState) => {
            return {reps: [rep].concat(prevState.reps)};
        });
    }

    deleteRep(id){
        let filteredArray = this.state.reps.filter(item => item.id !== id);
        this.setState({reps: filteredArray});
    }

    updateRep(rep, id){
        this.setState({reps: this.state.reps.map(elem => (elem.id === id ? elem = rep : elem))})
    }

    render(){
        let buttonNext;
        if (this.state.page !== this.props.last_page && !this.state.disabledNext){
            buttonNext= <div className='buttonnext' onClick={() => this.onChangePage()}>
                <span> Next </span> </div>
        }
        else{
            buttonNext=<div className='buttonnext disabled'>Next</div>;
        }


        return (
            <div className={"myColumn-lg"}>

                <div className="infinite-container">
                    <ItemReps items={this.state.reps} current_user_image={this.props.current_user_image}
                              current_user={this.props.current_user} courseNames={this.state.courseNames}
                              deleteRep={(id) => this.deleteRep(id)}
                              updateRep = {(rep, id) => this.updateRep(rep, id)}
                    />
                </div>
                <div className='myRow'>
                    {buttonNext}
                    <input className='input-form gap' type="text"  value={this.state.search}
                           onChange={this.updateSearch.bind(this)} placeholder="Filter reps by course's name"/>
                </div>

                <a className={"fixed"} onClick={() => this.showModal()}>
                    <i className={"fas fa-plus-circle fa-3x"} title={"Add post"}/>
                </a>
                <div className={"modal " + (this.state.modalState ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.closeModal} />
                    <AddRep current_user={this.props.current_user} closeModal={this.closeModal} addNewRep={(rep)=>this.addNewRep(rep)} courseNames={this.state.courseNames}/>
                </div>

            </div>

        )
    }


}