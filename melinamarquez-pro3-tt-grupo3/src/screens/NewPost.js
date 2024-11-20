import { Component } from "react";
import { TouchableOpacity } from "react-native";
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
            <View>
                <Text> Nuevo Posteo</Text>
                <TextInput 
                    keyboardType="default"
                    placeholder="Nuevo post"
                    onChangeText={ text => this.setState({post: text})}
                    value = {this.state.post}
                />

                <TouchableOpacity onPress={() => this.post(this.state.post)}>
                    <Text>
                        Postea
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default NewPost