import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
class DetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: firebase.auth().currentUser.email,
      name: "",
      age: "",
      latitude: null,
      longitude: null,
      image: "",
      hobbies: "",
      errorMsg: null,
      contact: "",
    };
  }

  componentDidMount=async()=> {
   await db.collection("users")
      .where("emailId", "==", this.state.emailId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          this.setState({
            emailId: doc.data().emailId,
            contact: doc.data().contact,
            name: doc.data().name,
            age: doc.data().age,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            hobbies: doc.data().hobbies,
          });
        });
      });
  }
  render() {
    return (
      <SafeAreaProvider>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            style={styles.bgImage}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCTNyYX4mgOZRNGHOdUkkKerGBbFtJ0Nm-pbmndK80uQZLPeBkqfsjZyIfOb5w0hUN8s&usqp=CAU",
            }}
          />
          <View
            style={{
              //  justifyContent: "flex-start",
              marginBottom: 30,
              // marginTop: -100,
            }}
          >
            <MyHeader title="Your Details" navigation={this.props.navigation} />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Name</Text>

            <Text> {this.state.name}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Email</Text>
           
            <Text> {this.state.emailId}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Contact</Text>
          
            <Text> {this.state.contact}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Age</Text>
           
            <Text> {this.state.age}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Location</Text>
            <Text> -Longitude: {this.state.longitude}</Text>

            <Text> -Latitude: {this.state.latitude}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Hobby</Text>
           
            <Text> {this.state.hobbies}</Text>
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#DCDCDC",
  },
  bgImage: {
    flex: 1,

    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  cardTittle: {
    color: "#808080",
    fontSize: 20,
    marginBottom: 3,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 100,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
  },
  profileCard: {
    height: 200,
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: "#808080",
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5,
  },
});

export default DetailsScreen;
