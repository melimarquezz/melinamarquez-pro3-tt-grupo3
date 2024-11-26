import { Component } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { auth } from '../firebase/config';


class Login extends Component{
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            error: ''
        }
    }
// voy chequeando si funciona, estoy trabado aca, sigo con el boton de like
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Home");
            }
        });
    }

    login(email, pass){
        if (!email.includes('@')) {
            return(this.setState({error: 'Email no existe'}))
        }
        else if (pass.length < 6){
            return(this.setState({error:'La contraseña debe tener al menos 6 caracteres'}))
        }

            auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({loggedIn: true});
                this.props.navigation.navigate("LoggedMenu") // aca no se si esto esta bien o si va LoggedMenu
            })
            .catch(error => {
                return(this.setState({error:'Contraseña incorrecta'}))

                console.log(error);
            })
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Formulario de Login</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Correo electrónico"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity
                    onPress={() => this.login(this.state.email, this.state.password)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Register")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Ir al Registro</Text>
                </TouchableOpacity>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
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
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        width: "90%",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
});

export default Login