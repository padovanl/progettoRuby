


class NewCourse2 extends React.Component {

    constructor(props){
        super(props);
        this.temp = [];
    }
    getDegreeCourses(){
        fetch('/api/v1/degree_courses.json')
            .then((response) => {return response.json()})
            .then((data) => { this.temp = data; });
    }

    render() {
        let formFields = {};
        this.getDegreeCourses();
        var degreeCourses = this.temp;

        return(
            <tr>
                <td>
                    <input ref={input => formFields.degree_course_id = input} type="hidden" value={this.props.degree_course_id}/>
                    <input ref={input => formFields.name = input} placeholder='Inserisci il nome del corso' className="input is-medium" required />
                </td>
                <td>
                    <input ref={input => formFields.year = input} placeholder="Inserisci anno del corso" className="input is-medium" required />
                </td>
                <td>
                    <a className="button is-rounded is-link is-fullwidth" onClick={ () => this.props.handleFormSubmit(formFields.degree_course_id.value, formFields.name.value, formFields.year.value)}>Inserisci</a>
                </td>
            </tr>
        )
    }

}