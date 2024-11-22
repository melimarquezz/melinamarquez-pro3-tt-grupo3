import { Component } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { auth } from '../firebase/config'


class Login extends Component{
    constructor(){
        super();
        this.state= {
            email: '',
            password: '',
            error: ''
        }
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
                this.props.navigation.navigate("Home") // aca no se si esto esta bien o si va LoggedMenu
            })
            .catch(error => {
                return(this.setState({error:'credenciales invalidas'}))

                console.log(error);
            })
        
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text>Formulario de Login</Text>
                <TextInput style = {styles.fields}
                        keyboardType="email-adress"
                        placeholder="email"
                        onChangeText={ text => this.setState({email:text})}
                        value= {this.state.email}
                    />
                <TextInput style = {styles.fields}
                    keyboardType="default"
                    placeholder="contraseña"
                    secureTextEntry= {true}
                    onChangeText={ text => this.setState({password:text})}
                    value= {this.state.password}
                />

                <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)} style={styles.boton}>
                    <Text style = {styles.texto}> Login </Text>
                </TouchableOpacity>

                <Text>
                    {this.state.error}
                </Text>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Register")} style={styles.boton}> 
                    <Text style = {styles.texto}>
                        Ir al registro
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Home")} style={styles.boton}>
                    <Text style = {styles.texto}>
                        Ir al Home Menu
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginTop: 20 
    },
    fields: {
       height: 20,
       paddingVertical: 15,
       paddingHorizontal: 10,
       borderWidth: 1,
       borderColor: '#ccc',
       borderStyle: 'solid',
       borderRadius: 6,
       marginVertical: 10
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    text: {
        color: '#fff'
    }
  });

export default Login