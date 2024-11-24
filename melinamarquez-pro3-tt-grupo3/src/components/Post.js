import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            numeroLikes: this.props.data.data.likes.length, // cuento los likes aca
        };
    }

    componentDidMount() {
        // veo si el usuario likeo
        const likeUsuario = this.props.data.data.likes.includes(auth.currentUser.email);
        this.setState({ like: likeUsuario });
    }

    like() {
        db.collection("posts").doc(this.props.data.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
        .then(() => {
            this.setState({
                like: true,
                numeroLikes: this.state.numeroLikes + 1,
            });
        })
        .catch((err) => console.log(err));
    }

    dislike() {
        db.collection("posts").doc(this.props.data.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
        .then(() => {
            this.setState({
                like: false,
                numeroLikes: this.state.numeroLikes - 1, 
            });
        })
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.postText}>Posteo: {this.props.data.data.post}</Text>
                <Text style={styles.postText}>Usuario: {this.props.data.data.username}</Text>
                <Text style={styles.postText}>Cantidad de likes: {this.state.numeroLikes}</Text>

                {this.state.like ? (
                    <TouchableOpacity onPress={() => this.dislike()} style={styles.likeButton}>
                        <Text style={styles.buttonText}>Quitar Me Gusta</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => this.like()} style={styles.likeButton}>
                        <Text style={styles.buttonText}>Me Gusta</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
    },
    postText: {
        fontSize: 16,
        marginBottom: 10,
    },
    likeButton: {
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});

export default Post;