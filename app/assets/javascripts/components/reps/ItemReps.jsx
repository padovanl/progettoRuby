
class ItemReps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }



    handleDelete(id){
        event.preventDefault();

        const deleteRep = this.props.deleteRep;

        let myHeaders = new Headers();
        myHeaders.append('X-CSRF-Token', Rails.csrfToken());

  /*      function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
*/
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'same-origin'
        };

        const request = new Request('/reps/'+id, options);

        fetch(request)
            .then(function () {
                deleteRep(id)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        return this.props.items.map((item) => {
            let offer_comp = "";
            let offer_search = "Cerco ";
            if (item.offer){
                offer_comp = <tr><td>{"Competenze: "}</td><td>{item.user_competence}</td></tr>;
                offer_search = "Offro ";
            }
            const title = offer_search.toString()+" ripetizioni per '"+item.course.name.toString()+"' con item id "+item.id.toString()+".\n";

            let deleteButton;
            let updateButton;
            console.log("itemuserid = currentuserid: ", item.user.id, "=", this.props.current_user.id);
            if (item.user.id === this.props.current_user.id){
                deleteButton = <button className="delete is-danger" onClick={()=>this.handleDelete(item.id)}/>;
                updateButton = <UpdateRep courseNames={this.props.courseNames}
                                          title={title.length > 50 ? title.substring(0,45)+"..." : title}
                                          price={item.price_hours}
                                          place={item.place}
                                          home_service={item.home_service}
                                          week_day={item.week_days}
                                          description={item.description}
                                          offer={offer_search === "Offro "}
                                          course={item.course.name}
                                          competence={item.user_competence}
                                          id={item.id}
                                          updateRep = {(rep, id) => this.props.updateRep(rep, id)}
                />;
            }

            let home_service;
            if (item.home_service===null)
                home_service="Non indicato";
            else home_service="No";

            return(
                <section key={item.id} className={"relative gap"}>

                    <div className={"box"}>
                        <article className="media gap">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <img src={this.props.current_user_image}/>
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content ">
                                    <strong>{item.user.name}</strong>
                                    <br/>
                                    <table className="table is-hoverable is-striped">
                                        <thead><tr><th>{title}</th></tr></thead>
                                        <tbody>
                                            {offer_comp}
                                            <tr><td>{"€/h"}</td><td>{item.price_hours >0 ? item.price_hours : "Gratis"}</td></tr>
                                            <tr><td>{"Luogo"}</td><td>{item.place}</td></tr>
                                            <tr><td>{"Lezione a domicilio"}</td><td>{item.home_service ? 'Si' : home_service}</td></tr>
                                            <tr><td>{"Giorni della settimana in cui è disponibile"}</td><td>{item.week_days}</td></tr>
                                            <tr><td>{"Descrizione"}</td><td>{item.description ? item.description : "Non sono presenti ulteriori informazioni."}</td></tr>
                                        </tbody>
                                    </table>
                                    <br/>

                                </div>
                            </div>
                            <div className={"media-right"}>
                                {deleteButton} {updateButton}
                            </div>
                        </article>

                        <RepComments current_user_image={this.props.current_user_image} item={item} user_name={item.user.name} title={title}
                        />
                    </div>
                    <div className={"is-divider"}/>

                </section>
               )

        });
    }


}