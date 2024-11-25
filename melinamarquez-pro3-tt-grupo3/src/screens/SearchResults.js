import React, { Component } from "react";
import Movie from "../../components/Movie/Movie";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            backup: [],
            cargador: true
        }
    }
    componentDidMount() {
        db.collection('users').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: users,
                        loading: false
                    })
                })
            }
        )
        console.log(users);
    }
    buscador(usuario){

    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <h1>Resultados para "{}" </h1>
                <article >
                    {this.state.cargador ?
                        <h3 className="cargador">Cargando...</h3> :
                        /*aca falta la condicion*/ !== 0 ?
                            this.state.usuario.map((users, idx) => <Movie key={users + idx} data={users} />) :
                            <h3 className="cargador">No hay resultados para "{this.props.match.params.usuario}" </h3>
                    }
                </article>



                <Footer />
            </React.Fragment>
        )
    }
}

export default SearchResults;