import { Component } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posteos: [],
      profile: [],
    };
  }

  componentDidMount() {
    db.collection("usuario").where("email", "==", auth.currentUser.email).onSnapshot((docs) => {
      let profile = [];
      docs.forEach((doc) => {
        profile.push({
          id: doc.id,
          data: doc.data(),
        });
        this.setState({ profile: profile });
      });
    });

    db.collection("posts").where("email", "==", auth.currentUser.email).onSnapshot((posts) => {
      let posteosDelUsuario = [];
      posts.forEach((doc) => {
        posteosDelUsuario.push({
          id: doc.id,
          data: doc.data(),
        });
        this.setState({ posteos: posteosDelUsuario });
      });
    });

    db.collection("usuario")
    .where("email", "==", auth.currentUser.email)
    .onSnapshot((snapshot) => {
        let userData = snapshot.docs[0].data();
        this.setState({
          profile: {
            username: userData.username,
            email: userData.email,
          },
        });
      
    });

  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login", { hideFooter: true });
}

  eliminarPerfil(id) {
    auth.currentUser
      .delete()
      .then(() => {
        return db.collection("usuario").doc(id).delete();
      })
      .then(() => {
        console.log("Usuario eliminado correctamente");
        this.props.navigation.navigate("Login");
      })
      .catch((error)=>{console.log(error);
      });
  }

  likear(id) {
    db.collection("posts").doc(id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
    });
  }

  desLikear(id) {
    db.collection("posts").doc(id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
    });
  }

  borrarPost(id) {
    db.collection("posts").doc(id).delete();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.arribaText}>Mi Perfil</Text>
        <Text style={styles.texto}> Nombre de Usuario: {this.state.profile.username}</Text>
        <Text style={styles.texto}>Email: {this.state.profile.email}</Text>
  
        <Text style={styles.arribaText}>Mis Posteos</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(unPost) => unPost.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postTexto}>Descripción: {item.data.post}</Text>
              <Text style={styles.postTexto}>Likes: {item.data.likes.length}</Text>
  
              {item.data.likes.includes(auth.currentUser.email) ? (
                <TouchableOpacity
                  onPress={() => this.desLikear(item.id)}
                  style={styles.likeButton}
                >
                  <Text style={styles.likeButtonText}>Sacar Me Gusta</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.likear(item.id)}
                  style={styles.likeButton}
                >
                  <Text style={styles.likeButtonText}>Me Gusta</Text>
                </TouchableOpacity>
              )}
  
              <TouchableOpacity
                onPress={() => this.borrarPost(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Borrar Post</Text>
              </TouchableOpacity>
            </View>
          )}
        />
  
        <View style={styles.seccionBoton}>
          <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
            <Text style={styles.textoBoton}>Logout</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.state.profile.length > 0) {
                this.eliminarPerfil(this.state.profile[0].id);
              } else {
                console.log("No hay perfil para eliminar");
              }
            }}
          >
            <Text style={styles.textoBoton}>Eliminar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f9f9", 
      padding: 15,
    },
    texto: { 
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      color: "#333",
    },
    textoBoton: { 
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    button: { 
      padding: 12,
      backgroundColor: "blue", 
      borderRadius: 5,
      alignItems: "center",
      marginVertical: 5,
    },
    postContainer: {
      backgroundColor: "white",
      padding: 15,
      marginBottom: 15,
      borderRadius: 8,
      shadowColor: "#000",
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    postTexto: {
      fontSize: 16,
      marginBottom: 8,
      color: "#555",
    },
    likeButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: "blue",
      borderRadius: 5,
      alignItems: "center",
    },
    likeButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    deleteButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: "red",
      borderRadius: 5,
      alignItems: "center",
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    seccionBoton: { 
      flexDirection: "row", 
      justifyContent: "space-between", 
      marginTop: 20,
    },
    arribaText: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
  });

export default Profile;
