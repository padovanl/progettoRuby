class SearchItem2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            degreen: '',
            degreet: '',
            category: 'Name',
            query: '',
            courses: [],
            page: 1,
            disabledNext: false,
            url: "/allcourses.json"
        };
        this.onChangePage = this.onChangePage.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount(){
        //this.getAllCourses(this.props.degree);
    }

 //   shouldComponentUpdate(nextProps, nextState){
   // }

    componentWillReceiveProps(nextProps){
        console.log("SI receive props");
        console.log("SI props last_page: "+nextProps.last_page);
    }

    getAllCourses(){
        this.setState({url: updateUrl(this.state.page, this.state.degreen, this.state.degreet, this.state.category, this.state.query)},
            () =>  getCourses(this.state.url)
                .then(teacher_courses => {
                    const newCourses = this.state.courses.concat(teacher_courses);
                    if (teacher_courses.length === 0)
                        this.setState({disabledNext: true});
                    this.setState({courses: newCourses})
                })
                .catch(this.handleError)
        )
    }

    updateSearch(event){
        this.setState({query: event.target.value.substr(0,20).toLowerCase()});
    }

    selectChanged(e){
        this.setState({category: e.target.value});
    }

    searchCourses(){
        console.log("cat: "+this.state.category+ ", query "+ this.state.query + ", page "+ this.state.page);
        this.setState({page: 1, disabledNext:false, degreen: '', degreet: ''},
            ()=> getCourses(updateUrl(this.state.page, '', '', this.state.category, this.state.query))
                .then(data => {
                    console.log("data: "+data);
                    this.setState({courses: data});
                    console.log("data: "+ data.length)
                })
                .catch(this.handleError)
        )}


    onChangePage() {
        this.setState({page: this.state.page +=1},this.getAllCourses());
    }


    onSubmit(degree_name, degree_tipo){
        console.log("SearchItem2 got: ", degree_name, degree_tipo);
        this.setState({degreen: degree_name, degreet: degree_tipo, disabledNext: false, page:1},
            ()=> getCourses(updateUrl(this.state.page, this.state.degreen, this.state.degreet))
                .then(data => {
                    console.log("data: "+data);
                    this.setState({courses: data});
                    console.log("data: "+ data.length);
                    if (data.length ===0){
                        this.setState({disabledNext: true})
                    }
                })
                .catch(this.handleError)
        );
        console.log("Nuovi corsi dopo submit di Search_degree: ", this.state.courses)
    };


    render(){
        let searchButton;
        if (this.state.query === '' || (this.props.last_page === true && this.state.changedInputSearch===false))
            searchButton = <div className={' button-search gap'} onClick={this.searchCourses.bind(this)}> <span>All</span> </div>;
        else
            searchButton = <div className=' button-search gap' onClick={this.searchCourses.bind(this)} > <span>Search</span></div>;

        let options = this.props.categories.map((opt) => {
            return(
                <option key={opt} value={opt}>{opt}</option>
            )
        });
        

        return (
            <section>
                <div className={'myRow'}>
                    <Search_degree onSubmit={(degreen, degreet) => this.onSubmit(degreen, degreet)} />
                </div>
                <hr/>
                <div className='myRow'>
                    <form className='search-form'>
                        <h3><b>Advanced Search:</b></h3>
                        <div className='columns'>
                            <div className='myColumn myColumn-sm' onClick={this.selectChanged.bind(this)}>
                                <select required className='mySelect gap'>
                                    {options}
                                </select>
                            </div>
                            <div className='myColumn myColumn-md'>
                                <input required className='input-form gap' type="text" value={this.state.name}
                                       onChange={this.updateSearch.bind(this)} placeholder="Search courses"/>
                            </div>
                            <div className='myColumn myColumn-sm'> {searchButton} </div>
                        </div>
                    </form>
                    <IndexCourses2 courses={this.state.courses}
                                   page={this.state.page}
                                   last_page={this.props.last_page}
                                   url={this.state.url}
                                   onChangePage={this.onChangePage}
                                   disabledNext={this.state.disabledNext}
                    />
                </div>
            </section>
        )
    }

}