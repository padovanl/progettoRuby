class CoursesList extends React.Component{

    render(){
        const fn = item =>
            <ListItem
                key={item.id}
                item={item}/>;

        let listItems = this.props.listItems;

        if(listItems.length >0){
            listItems = listItems.map(fn);
        }
        else{
            listItems = <li className={"lsit_empty-list"}>
                Lista vuota. <br/> Contattare l'amministratore per aggiungere un nuovo corso.
            </li>;
        }

        return(
            <ul>
                {listItems}
            </ul>
        );

    }

}

//React.export default CoursesList;