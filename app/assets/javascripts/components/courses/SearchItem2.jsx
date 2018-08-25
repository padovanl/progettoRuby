class SearchItem2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category: 'Name',
            query: '',
            courses: [],
            page: 1,
            url: "/allcourses.json"
        };
        this.onChangePage = this.onChangePage.bind(this)
        //backupCoursesIndex = backupCoursesIndex.bind(this);
       // this.resetParameters = this.resetParameters.bind(this);
    }

    componentWillMount(){
        this.getAllCourses();
    }

    componentWillReceiveProps(nextProps){
        console.log("SI receive props");
        console.log("SI props last_page: "+nextProps.last_page);
    }

    getAllCourses(){
        console.log("page:"+this.state.page+ " url:"+this.state.url+" categ:"+this.state.category+" query:"+this.state.query);
        let newUrl = updateUrl(this.state.page, this.state.category, this.state.query);
        console.log("SI newUrl:"+newUrl);
        this.setState({url: newUrl}, ()=> {
            getCourses(this.state.url)
                .then(teacher_courses => {
                    const newCourses = this.state.courses.concat(teacher_courses);
                    if (teacher_courses.length === 0)
                        return "Non ci sono altri corsi.";
                    this.setState({courses: newCourses})
                })
                .catch(this.handleError)
        })
    }

    updateSearch(event){
        this.setState({query: event.target.value.substr(0,20).toLowerCase(),  page: 1});
    }

    selectChanged(e){
        this.setState({category: e.target.value});
    }

    searchCourses(){
        console.log("cat: "+this.state.category+ ", query "+ this.state.query + ", page "+ this.state.page);
        let newUrl = updateUrl(this.state.page, this.state.category, this.state.query);

        getCourses(newUrl)
                .then(data => {
                    console.log("data: "+data);
                    if (this.state.page===1)
                        this.setState({courses: data});
                    else
                        this.setState({courses: this.state.course.concat(data)});
                    console.log("data: "+ data.length)
                })
                .catch(this.handleError)


     /*   getCourses(this.state.page, this.state.url, this.state.category, this.state.query)
            .then(data => {
                console.log("data: "+data);
                if (this.state.page===1)
                    this.setState({courses: data[0], url: data[1]});
                else
                    this.setState({courses: this.state.course.concat(data[0]), url:data[1]});

                console.log("data: "+ data.length)
            })
            .catch(this.handleError);
*/
    }


    onChangePage() {
        this.setState({page: this.state.page +=1},this.getAllCourses());
    }


    render(){
        let searchButton;
        if (this.state.query === '' || (this.props.last_page === true && this.state.changedInputSearch===false))
            searchButton = <div className=' button-search gap disabled'> <span>Search</span> </div>;
        else
            searchButton = <div className=' button-search gap' onClick={this.searchCourses.bind(this)} > <span>Search</span></div>;

        let options = this.props.categories.map((opt) => {
            return(
                <option key={opt} value={opt}>{opt}</option>
            )
        });

        return (
            <div className='myRow'>
                <form className='search-form'>
                    <h3><b>Advanced Search:</b></h3>
                    <div className='columns'>
                        <div className='myColumn myColumn-sm' onClick={this.selectChanged.bind(this)} >
                            <select required className='mySelect gap'>
                                {options}
                            </select>
                        </div>
                        <div className='myColumn myColumn-md'>
                            <input required className='input-form gap' type="text" value={this.state.name} onChange={this.updateSearch.bind(this)} placeholder="Search courses"/>
                        </div>
                        <div className='myColumn myColumn-sm'> {searchButton} </div>
                    </div>
                </form>
                <IndexCourses2 courses={this.state.courses}
                               page={this.state.page}
                               last_page={this.props.last_page}
                               url={this.state.url}
                               onChangePage={this.onChangePage}
                             //  query={this.state.query}
                />
            </div>
        )
    }

}