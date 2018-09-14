class IndexTheses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theses: [],
            url: '',
            page: 1,
            disabledNext: false,
            message:'',
            courseNames: []
        };
        this.getAllTheses = this.getAllTheses.bind(this);
        updateIndexReps = updateIndexReps.bind(this);
    }


    componentWillMount(){
        this.getAllTheses();
    }

    getAllTheses(){
        getItems(this.props.url+this.state.page)
            .then(data =>{
                if (data.length === 0)
                    this.setState({message: "Theses non trovati!"});
                else{
                    this.setState({theses: this.state.theses.concat(data)})
                }
            })
            .catch((e) => console.log(e))
    }

    onChangePage() {
        this.setState({page: this.state.page +=1},this.getAllTheses());
    }


    render(){
        let items = this.state.theses.map(item => {
            return <Thesis item={item}/>
        });

        let buttonNext;
        if (this.state.page !== this.props.last_page && !this.state.disabledNext){
            buttonNext= <div className='buttonnext' onClick={() => this.onChangePage()}>
                <span> Next </span> </div>
        }
        else{
            buttonNext=<div className='buttonnext disabled'>Next</div>;
        }

        return(

            <section>
                <div className="infinite-container" align="center">
                    {items}
                </div>



                <div className='myRow'>
                    {buttonNext}
                </div>

            </section>

        )
    }

}