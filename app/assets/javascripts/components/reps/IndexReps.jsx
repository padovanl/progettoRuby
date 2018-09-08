class IndexReps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reps: [],
            url: this.props.url,
            page:1,
            disabledNext: false,
            search: '',
            tabs_activate: 'is-activate'
        };
        this.getAllReps = this.getAllReps.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        this.getAllReps()
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
        this.setState({url: updateUrl(this.props.url, this.state.page)},
            ()=> getItems(this.state.url)
            .then(data => {
                if (data.length === 0){
                    this.setState({disabledNext: true})
                }
                else{
                    this.setState({reps: this.state.reps.concat(data)})
                }
            })
            .catch(e => console.log(e))

        )
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
                    <ItemReps items={this.state.reps} current_user={this.props.current_user_image}/>
                </div>
                <div className='myRow'>
                    {buttonNext}
                    <input className='input-form gap' type="text"  value={this.state.search}
                           onChange={this.updateSearch.bind(this)} placeholder="Filter reps by course's name"/>
                </div>

                <a className={"fixed"} onClick={() => this.showModal()}>
                    <i className={"fas fa-plus fa-2x"} title={"Add post"}/>
                </a>

                <div className={"modal " + (this.state.modalState ? "is-active" : "")}>
                    <div className="modal-background" onClick={this.closeModal} />

                    <AddRep current_user={this.props.current_user} closeModal={this.closeModal} />
                </div>

            </div>

        )
    }


}