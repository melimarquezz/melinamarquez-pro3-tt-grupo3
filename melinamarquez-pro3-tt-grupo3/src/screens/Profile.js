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
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
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
      <View>
        <Text style={styles.texto}>Mis Posteos</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(unPost) => unPost.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.texto}>Descripción: {item.data.post}</Text>
              <Text style={styles.texto}>Likes: {item.data.likes.length}</Text>
              
// botones de like y dislikear
              {item.data.likes.includes(auth.currentUser.email) ? (
                <TouchableOpacity onPress={() => this.desLikear(item.id)}>
                  <Text style={styles.textoBoton}>Sacar Me Gusta</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.likear(item.id)}>
                  <Text style={styles.textoBoton}>Me Gusta</Text>
                </TouchableOpacity>
              )}

              
              <TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                <Text style={styles.textoBoton}>Borrar Post</Text>
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
  texto: { 
    fontSize: 16,
    marginVertical: 10
    },
  textoBoton: { 
    color: "blue",
    marginVertical: 5 
    },
  button: { 
    marginTop: 20,
    padding: 10,
    backgroundColor: "red"
    },
  seccionBoton: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 20 
}
});

export default Profile;
