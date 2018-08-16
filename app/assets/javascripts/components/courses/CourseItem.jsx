class CourseItem extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.onDelete(this.props.item.id);
    }

    render() {
        const item = this.props.item;
        return (
            <li className="list__item"><span>{item.name}</span>
                <button onClick={this.handleClick}>×</button>
            </li>
        );
    }

}