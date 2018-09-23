function updateIndexTheses(u, ts){
    let disabled = false;
    let message = '';
    if (ts.length<this.props.last_page){
        disabled = true;
    }
    if (ts.length ===0){
        message = "Tesi non trovate!";
    }
    this.setState({url: u, theses: ts, page:1, disabledNext: disabled, message: message})
}

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
    }


    componentDidMount(){
        console.log("last_page", this.props.last_page);
        this.getAllTheses();
        updateIndexTheses = updateIndexTheses.bind(this);

    }

    getAllTheses(){
        getItems(this.props.url+this.state.page+"&per_page="+this.props.per_page+this.state.url)
            .then(data =>{
                if (data.length === 0 && this.state.theses.length === 0)
                    this.setState({message: "Tesi non trovate!", disabledNext: true});
                else if (data.length<this.props.per_page)
                    this.setState({disabledNext: true, theses: this.state.theses.concat(data)});
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

        let message;
        if (this.state.message!==''){
            message =   <div className={"message is-danger gap"}  >
                <div className="message-body">
                    {this.state.message }
                </div>
            </div>;
        }
        else message='';

        return(

            <section>
                {message}

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