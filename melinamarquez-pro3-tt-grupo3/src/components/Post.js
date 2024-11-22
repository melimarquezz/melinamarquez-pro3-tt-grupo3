import React from "react";
import { Component } from "react";
import { View, Text } from "react-native-web";
import { TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            like: false,
            cartel: "Me gusta"
        }
    }
    actualizadorDeLikes() {
        console.log("le di like");
        db.collection('posts')
            .doc(this.props.data.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.username)
            })
            .then(res => {
                console.log("entre al then");
                this.setState(
                    {
                        like: true,
                        cartel: "No me gusta"
                    }
                )
            }
            )
    }
    dislike() {
        // hacer la funcion de like o dislike ACA
    }
    render() {
        return (
            <View>
                <Text>
                    Posteo: {this.props.data.data.mensaje}
                </Text>
                <Text>
                    {this.props.data.data.username}
                </Text>
                <Text>Cantidad de likes : {this.props.data.data.likes.length}</Text>
                <TouchableOpacity onPress={this.state.like ? () => this.dislike() : () => this.actualizadorDeLikes()}><Text>{this.state.texto}</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Post