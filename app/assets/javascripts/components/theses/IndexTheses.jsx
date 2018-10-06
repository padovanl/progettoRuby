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
            return <Thesis item={item} key={item.id}/>
        });

        let buttonNext;
        if (this.state.page !== this.props.last_page && !this.state.disabledNext){
            buttonNext= <div className='button is-rounded is-info' onClick={() => this.onChangePage()}>
                <span> Next </span> </div>
        }
        else{
            buttonNext=<div className='button is-rounded is-info disabled'>Next</div>;
        }

        let message;
        if (this.state.message!==''){
            message =   <div className="is-danger container" style={{textAlign: 'center', background: '#ffa726', padding: '20px'}} >
                            <div>
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



                <div className='myRow next-button' style={{marginBottom: '20px'}}>
                    {buttonNext}
                </div>

            </section>

        )
    }

}