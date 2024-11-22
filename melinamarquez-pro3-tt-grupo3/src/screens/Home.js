import { React, Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

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
        console.log(this.state);

        return (
            <View>
                <Text>Home</Text>
                {this.state.loading ? <ActivityIndicator /> : <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post data={item} />}></FlatList>}
            </View>
        )
    }
}


export default Home