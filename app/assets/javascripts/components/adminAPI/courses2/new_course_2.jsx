


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

        let style = {
            marginTop: "1%",
            marginBottom: "1%",
            marginRight: "1%",
            marginLeft: "1%",
        };

        let hideStyle = {
            display: "none",
        };


        return(
            <div style={hideStyle} id="insertDiv">
                <fieldset>
                    <legend>Inserisci nuovo corso</legend>
                    <div style={style}>
                        <input ref={input => formFields.degree_course_id = input} type="hidden" value={this.props.degree_course_id}/>
                        <input ref={input => formFields.name = input} placeholder='Inserisci il nome del corso' className="input is-medium" required />
                        <br/>
                        <br/>
                        <input ref={input => formFields.year = input} placeholder="Inserisci anno del corso" className="input is-medium" required />
                        <br/>
                        <br/>
                        <a className="button is-rounded is-link is-fullwidth" onClick={ () => this.props.handleFormSubmit(formFields.degree_course_id.value, formFields.name.value, formFields.year.value)}>Inserisci</a>
                    </div>
                </fieldset>
            </div>
        )
    }

}