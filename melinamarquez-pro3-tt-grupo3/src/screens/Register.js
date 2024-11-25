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
            <View style={styles.contenedor}>
                <Text style={styles.texto}>Registrate</Text>
                <TextInput style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Username"
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                {this.state.error}

                <TouchableOpacity onPress={() => {
                    this.register(this.state.email, this.state.password, this.state.username)
                    this.props.navigation.navigate("Login")}} style={styles.boton}>
                    <Text style={styles.textoBoton}>
                        Registrate
                    </Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#f4f4f4", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20,
      },
      texto: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333", // Texto oscuro
      },
      input: {
        width: "90%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff", // Fondo blanco para inputs
      },
      error: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
      },
      boton: {
        backgroundColor: "#007BFF", // Azul típico para botones
        padding: 15,
        borderRadius: 5,
        width: "90%",
        alignItems: "center",
        marginBottom: 10,
      },
      textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      link: {
        marginTop: 10,
        fontSize: 16,
        color: "#007BFF",
        textDecorationLine: "underline",
      },

});


export default Register