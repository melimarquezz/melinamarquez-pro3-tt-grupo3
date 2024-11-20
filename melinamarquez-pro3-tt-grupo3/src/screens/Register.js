import { Component } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text, Touchable } from "react-native";
import { View } from "react-native";
import { auth, db } from '../firebase/config'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
        }
    }

    onSubmit() {
        console.log(this.state);
    }

    register(email, pass, username) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                this.setState({ registered: true });
                this.props.navigation.navigate("LoggedMenu")
                console.log(this.state);
                db.collection('usuario').add({
                    email: email,
                    password: pass,
                    username: username,
                    createdAt: Date.now()
                })
                    .then()
                    .catch(e => console.log(e))
            })
            .catch(error => {
                this.setState({ error: 'Fallo en el registro' })
            })

    }

    render() {
        return (
            <View >
                <Text>Formulario de Register</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    keyboardType="default"
                    placeholder="username"
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    keyboardType="default"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                    <Text>
                        Registate!!
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});


export default Register