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
            error: "",
            registrado: ""
        }
    }

    onSubmit() {
        console.log(this.state);
    }

    register(email, pass, username) {
        if (!email.includes('@')) {
            return(this.setState({error: 'Email no existe'}))
        }
        else if (pass.length < 6){
            return(this.setState({error:'La contraseña debe tener al menos 6 caracteres'}))
        } else {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                this.setState({ registrado: true });
                this.props.navigation.navigate("Login") //probar de poner esto en el boton
                console.log(this.state);
                db.collection('usuario').add({
                    email: email,
                    password: pass,
                    username: username,
                    createdAt: Date.now(), 
                    registrado: true
                })
                    .then()
                    .catch(e => console.log(e))
            })
            .catch(error => {
                this.setState({ error: 'Fallo en el registro' })
            })
        }

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

                {this.state.error}

                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                    <Text>
                        Registrate
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}>
                    <Text>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});


export default Register