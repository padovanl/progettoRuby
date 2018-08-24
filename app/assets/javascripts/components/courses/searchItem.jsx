function backupCoursesIndex(data){
    this.setState({coursesBackup: data});
}

class SearchItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: props.categories,
            category: 'Name',
            query: '',
            page: 1,
            data: [],
            last_page: false,
            changedInputSearch:false,
            autoCompleteResults: [],
            itemSelected: {},
            coursesBackup: [],
            showItemSelected: false
        };
        backupCoursesIndex = backupCoursesIndex.bind(this);
        this.resetParameters = this.resetParameters.bind(this);
    }

    resetParameters(){
        this.setState({page:1, data:[], last_page:false, changedInputSearch:false})
    }

    updateSearch(event){
        this.setState({query: event.target.value.substr(0,20).toLowerCase(), changedInputSearch: true, page: 1, last_page:false});
    }


    selectChanged(e){
        this.setState({category: e.target.value});
    }


    redirectSearch(){
        console.log("cat: "+this.state.category+ ", query "+ this.state.query + ", page "+ this.state.page);
        if (this.state.page === 1){
            searchAll(this.state.category, this.state.query, this.state.page)
                .then(data=> {
                    if (data.length ===0 )
                        this.setState({last_page: true});
                    externalSetStateCourses(data);
                    console.log("data: "+ data.length)
                })
                .catch(this.handleError);
        }
        else{
            searchAll(this.state.category, this.state.query, this.state.page)
                .then(data=> {
                    if (data.length ===0 )
                        this.setState({last_page: true});
                    else
                        externalConcatStateCourses(data);
                })
                .catch(this.handleError);
        }
        setClickedButtonSearch(true);
        this.setState({changedInputSearch: false});
        console.log("last page: "+this.state.last_page);
        console.log("changed: "+ this.state.changedInputSearch);
        this.setState({page: this.state.page+1});
    }

    returnSearchCourses(){ // completare questa funz corrente
        //ritorno i primi corsi che aveva prima della ricerca
        externalSetStateCourses(this.state.coursesBackup);
        resetParameters(); //resetto lo state tranne che per la categoria che deve camminare insieme a quella che è stata selezionata
        //riabilito il tasto Next
        //disabilito tasto search (se input è vuoto, magari lascio così com'è)
    }


    //modificare tasto search in next (solo nome) dopo il primo click

    render(){
        let searchButton;
        if (this.state.query === '' || (this.state.last_page === true && this.state.changedInputSearch===false))
            searchButton = <div className=' button-search gap disabled'> <span>Search</span> </div>;
        else
            searchButton = <div className=' button-search gap' onClick={this.redirectSearch.bind(this)} > <span>Search</span></div>;


        let backButton;
        if (this.state.query === '' || (this.state.last_page === true && this.state.changedInputSearch===false))
            backButton = <div className=' button-search gap disabled'> <span>Search</span> </div>;
        else
            backButton = <div className=' button-search gap' onClick={this.returnSearchCourses.bind(this)} > <span>Search</span></div>;



        let options = this.state.categories.map((opt) => {
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
                        <div className='myColumn myColumn-sm'> {backButton} </div>
                    </div>
                </form>

            </div>
        )
    }
}
