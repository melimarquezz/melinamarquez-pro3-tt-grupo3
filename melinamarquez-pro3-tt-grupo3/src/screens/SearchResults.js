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
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Introduzca un nombre de usuario"
                    onChangeText={(buscado) => {
                        this.setState({ buscado: buscado });
                        this.buscador(buscado);
                    }}
                    value={this.state.buscado}
                />
                {this.state.error ? (
                    <Text style={styles.error}>{this.state.error}</Text>
                ) : (
                    <FlatList
                        data={this.state.encontrados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.text}>Email: {item.data.email}</Text>
                                <Text style={styles.text}>Username: {item.data.username}</Text>
                            </View>
                        )}
                        style={styles.list}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    input: {
        width: "90%",
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    list: {
        flex: 1,
        width: "100%",
    },
    listItem: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    error: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
});
export default SearchResults;