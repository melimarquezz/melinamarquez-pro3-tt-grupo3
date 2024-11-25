import React, { Component } from "react";
import { Text , FlatList, TextInput, View } from "react-native-web";
import { db } from "../firebase/config";


class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            buscado: "",
            error: "",
            buscador: false,
            encontrados: []
        }
    }

    componentDidMount() {
        db.collection('usuario').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: users
                    });
                })
            })
    }


    buscador(usuarios) {
        let encontrados = this.state.users.filter((usuario) => {
            let muestra= usuario.data.username.toLowerCase()
            return muestra.includes(usuarios.toLowerCase());
        })
        this.setState({
            encontrados : encontrados,
            buscador: true
        })
        if (encontrados.length === 0) {
            this.setState({
                error: "No existe ese usuario"
            })
        }else {
            this.setState({
                error: ""
            })
        }
        console.log(this.state.encontrados);        
    }

    render() {
        console.log(this.state.encontrados);
        return (
            <View>
                <TextInput
                    placeholder="Introduzca un nombre de usuario"
                    onChangeText={(buscado) => {
                        this.setState({ buscado: buscado });
                        this.buscador(buscado);
                    }}
                    value={this.state.buscado} />
                    {this.state.error === "" ? 
                <FlatList
                    data={this.state.encontrados}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View >
                            <Text>Email: {item.data.email}</Text>
                            <Text>Username: {item.data.username}</Text>
                        </View>
                    )}  
                /> : 
                <Text> {this.state.error} </Text>
    }
            </View>
        )
    }
}

export default SearchResults;