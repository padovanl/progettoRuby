function updateIndexReps(URL, reps){
    this.setState({url: URL, reps: reps, page:1, disabledNext: false})
}

class IndexReps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reps: [],
            url: '',
            page:1,
            disabledNext: false,
            tabs_activate: 'is-activate',
            courseNames:[],
            modalIsActive: false,
            linkReport: ''
        };
        this.getAllReps = this.getAllReps.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewRep = this.addNewRep.bind(this);
        updateIndexReps = updateIndexReps.bind(this);
        this.activeModal = this.activeModal.bind(this)

    }

    componentWillMount(){
        this.getAllReps();
        getNames('Course')
            .then(data => {
                this.setState({courseNames: data})
            })
            .catch((e) => console.log(e))
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
        getItems(updateUrlReps(this.props.url, this.props.per_page, this.state.url, this.state.page))
            .then(data => {
                if (data.length < this.props.per_page){
                    this.setState({disabledNext: true})
                }
                this.setState({reps: this.state.reps.concat(data)})
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

    activeModal(link){
        console.log("afadasdasdads")
        this.setState({modalIsActive: true})
        this.setState({linkReport: link})
    }

    disableModal() {
        this.setState({modalIsActive: false});
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

                <div className="infinite-container" align="center">
                    <ItemReps items={this.state.reps} current_user_image={this.props.current_user_image}
                              current_user={this.props.current_user} courseNames={this.state.courseNames}
                              deleteRep={(id) => this.deleteRep(id)}
                              updateRep = {(rep, id) => this.updateRep(rep, id)}
                              activeModal={this.activeModal}
                    />
                </div>
                <div className='myRow'>
                    {buttonNext}
                </div>

                <a className={"fixed"} onClick={() => this.showModal()}>
                    <i className={"fas fa-plus-circle fa-3x"} title={"Add post"}/>
                </a>
                <div className={"modal " + (this.state.modalState ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.closeModal} />
                    <AddRep current_user={this.props.current_user} closeModal={this.closeModal} addNewRep={(rep)=>this.addNewRep(rep)} courseNames={this.state.courseNames}/>
                </div>

                <div className={"modal " + (this.state.modalIsActive ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.disableModal.bind(this)} />

                    <ReportModal  linkReport={this.state.linkReport}
                                  disableModal={this.disableModal.bind(this)} title={"Segnalazione suggerimento"}/>

                    <button className="modal-close is-large" aria-label="close"
                            onClick={this.disableModal.bind(this)} />
                </div>

            </div>

        )
    }


}