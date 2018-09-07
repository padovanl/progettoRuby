
class ItemReps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }



    render(){
        return this.props.items.map((item) => {
            let offer_comp = "";
            let offer_search = "Cerco ";
            if (item.offer){
                offer_comp = <tr><td>Competenze:</td><td>{item.user_competence}</td></tr>;
                offer_search = "Offro ";
            }
            const title = offer_search.toString()+" ripetizioni per '"+item.course.name.toString()+"' con item id "+item.id.toString()+".\n";

            return(
                <section key={item.id} className={"relative gap"}>
                    <div className={"box"}>
                        <article className="media gap">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <img>{this.props.current_user_image}</img>
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
                                            <tr><td>€/h </td><td>{item.price_hours ? item.price_hours : "Non indicato"}</td></tr>
                                            <tr><td>Luogo</td><td> {item.place}</td></tr>
                                            <tr><td>Lezione a domicilio</td><td> {item.home_service ? 'Si' : 'No'}</td></tr>
                                            <tr><td>Giorni della settimana in cui è disponibile</td> <td>{item.week_days}</td></tr>
                                            <tr><td>Descrizione</td><td> {item.description ? item.description : "Non sono presenti ulteriori informazioni."}</td></tr>
                                        </tbody>
                                    </table>
                                    <br/>

                                </div>
                            </div>
                        </article>

                        <RepComments current_user_image={this.props.current_user_image} item={item} user_name={item.user.name} title={title} />
                    </div>
                    <div className={"is-divider"}/>

                </section>
               )

        });
    }


}