import { React, Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";
import { StyleSheet } from "react-native";
class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        loading: false
                    })
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                {this.state.loading ? (
                    <ActivityIndicator style={styles.loading} size="large" color="#007BFF" />
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post data={item} />}
                        style={styles.list}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    list: {
        flex: 1,
        width: "100%",
    },
    loading: {
        marginTop: 20,
    },
});


export default Home