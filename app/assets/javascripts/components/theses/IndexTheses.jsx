class IndexTheses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }




    onChangePage() {
        console.log("honchange page theses url: ", this.props.url);
        this.props.onChangePage();
    }


    render(){
        let items = this.props.theses.map(item => {
            return <Thesis item={item} key={item.id}/>
        });

        let buttonNext;
        if (this.props.page !== this.props.last_page && !this.props.disabledNext){
            buttonNext= <div className='button is-rounded is-info' onClick={() => this.onChangePage()}>
                <span> Next </span> </div>
        }
        else{
            buttonNext=<div className='button is-rounded is-info disabled'>Next</div>;
        }

        let message;
        if (this.props.message!==''){
            console.log("Messaggio: ",this.props.message);
            message =   <div className="is-danger container" style={{textAlign: 'center', background: '#ffa726', padding: '20px'}} >
                            <div>
                                {this.props.message }
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