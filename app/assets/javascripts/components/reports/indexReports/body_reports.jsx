class BodyReports extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            reports: [],
            url: '',
            page:1,
            disabledNext: false,
        };

        this.getAllReports = this.getAllReports.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleMarkAndRedirect = this.handleMarkAndRedirect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount(){
        this.getAllReports();
    }

    getAllReports(){
        get_items(update_url_notifications(this.props.url, this.state.url, this.state.page))
            .then(data => {
                if (data.length === 0){
                    this.setState({disabledNext: true})
                }
                else{
                    this.setState({reports: this.state.reports.concat(data)})
                }
            })
            .catch(e => console.log(e)
            )
    }

    handleShowMore() {
        console.log("dentro showmore")
        this.setState({page: this.state.page +=1},this.getAllReports());
    }

    handleMarkAndRedirect(redirect_url, id){
        console.log(redirect_url)
        // /api/v1/users/:user_id/user_courses/:id(.:format)
        let linkUpdate = '/mark_as_read_report/' + id;
        fetch(linkUpdate,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            return response.json()
        })
            .then((notification) => {
                if (notification.error) {
                    alert("Errore!")
                } else {
                    window.location.href = redirect_url;
                }
            })
    }

    handleDelete(id){
        // /courses/:course_id/questions/:id(.:format)
        let linkDelete = '/reports/' + id
        if(confirm('Confermi di aver risolto questa segnalazione?')){
            fetch(linkDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                if (response.ok){
                    console.log("risposta ok")
                    this.deleteReport(id);
                }else{
                    alert("errore")
                }
            })
        }
    }

    deleteReport(id){
        console.log("dentro delete", id)
        let newReports = this.state.reports.filter((f) => f.id !== id)
        this.setState({reports: newReports})
    }

    render(){

        return(
            <div>
                <AllReports reports={this.state.reports}
                                  handleShowMore={this.handleShowMore}
                                  page={this.state.page}
                                  last_page={this.props.last_page}
                                  disabledNext={this.state.disabledNext}
                                  handleMarkAndRedirect={this.handleMarkAndRedirect}
                                  handleDelete={this.handleDelete}/>
            </div>
        )
    }
}