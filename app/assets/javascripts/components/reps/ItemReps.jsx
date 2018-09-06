const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

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

            return(
                <section key={item.id} className={"relative gap"}>

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
                                    <thead><tr><th>Informazioni</th></tr></thead>
                                    <tbody>
                                        <tr><td>{offer_search} ripetizioni per "{item.course.name}" con item id {item.id}</td></tr>
                                        {offer_comp}
                                        <tr><td>€/h </td><td>{item.price_hours ? item.price_hours : "Non indicato"}</td></tr>
                                        <tr><td>Luogo</td><td> {item.place}</td></tr>
                                        <tr><td>Servizio a domicilio</td><td> {item.home_service ? 'Si' : 'No'}</td></tr>
                                        <tr><td>Giorni della settimana in cui è disponibile</td> <td>{item.week_days}</td></tr>
                                        <tr><td>Descrizione</td><td> {item.description ? item.description : "Non sono presenti ulteriori informazioni."}</td></tr>
                                    </tbody>
                                </table>
                                <br/>
                                <small><a>Like</a> · <a>Reply</a> · {(new  Date(Date.parse(item.created_at))).toLocaleDateString('it-IT', options)}</small>
                            </div>
                        </div>
                    </article>

                    <article className="media gap">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img >{this.props.current_user_image}</img>
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="field">
                                <p className="control">
                                    <textarea className="textarea" placeholder="Add a comment..."></textarea>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <button className="button">Post comment</button>
                                </p>
                            </div>
                        </div>
                    </article>

                    <div className={"is-divider"}/>

                </section>
               )

        });
    }


}