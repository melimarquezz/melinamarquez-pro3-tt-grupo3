import { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native";
import { db, auth } from "../firebase/config";

class NewPost extends Component {
    constructor (){
        super();
        this.state = { 
            post: ''
        }
    }

    post(post){
        db.collection('posts').add({
            email: auth.currentUser.email,
            post: post,
            createdAt: Date.now(),
            likes: []
        })
        .then()
        .catch( e => console.log(e))
    }

    render (){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}> Nuevo Posteo</Text>
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Nuevo post"
                    onChangeText={ text => this.setState({post: text})}
                    value = {this.state.post}
                />

                <TouchableOpacity onPress={() => this.post(this.state.post)} style={styles.boton}>
                    <Text style={styles.tituloBoton}>
                        Postea
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#f9f9f9", 
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333", 
        marginBottom: 20,
      },
      input: {
        width: "90%",
        minHeight: 100, 
        backgroundColor: "#fff", 
        borderColor: "#ddd", 
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: "top", 
      },
      boton: {
        backgroundColor: "#007BFF", 
        padding: 15,
        borderRadius: 8,
        width: "90%",
        alignItems: "center",
      },
      tituloBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
})

export default NewPost