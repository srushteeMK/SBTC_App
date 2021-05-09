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
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import firebase from "firebase";
import db from "../config";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import MyHeader from "../components/MyHeader";

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
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
  componentDidMount() {
    db.collection("users")
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
  add = async () => {
    db.collection("users").doc(this.state.emailId).update({
      contact: this.state.contact,
      name: this.state.name,
      age: this.state.age,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      hobbies: this.state.hobbies,
    });
    alert("Information updated successfully");
  };
  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({ errorMsg: "Permission to access location was denied" });
      Alert.alert(this.state.errorMsg);
    } else {
      var location = await Location.getCurrentPositionAsync({});

      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log(this.state.latitude);
    }
  };
  setSelectedValue = async (value) => {
    this.setState({ hobbies: value });
  };
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
             // justifyContent: "flex-start",
              marginBottom: 50,
              marginTop: "-25%",
            }}
          >
            <MyHeader
              title="Change Your Details"
              navigation={this.props.navigation}
            />
          </View>
          <View style={styles.inputContainer}>
            <FloatingLabelInput
              label="Name"
              value={this.state.name}
              // mask="99/99/9999"
              keyboardType="default"
              onChangeText={(value) => this.setState({ name: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <FloatingLabelInput
              //  style={[styles.container,{marginBottom:10}]}
              label="Age"
              value={this.state.age}
              mask="00"
              keyboardType="numeric"
              onChangeText={(value) => this.setState({ age: value })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.inputContainer,
                {
                  width: "69%",
                  borderWidth: 3,
                  borderRadius: 12,
                  borderColor: "#686B73",
                  alignItems: "flex-start",
                },
              ]}
            >
              <Text style={styles.btnText}>Latitude-{this.state.latitude}</Text>
              <Text style={styles.btnText}>
                Longitude-{this.state.longitude}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.getLocation();
              }}
            >
              <Text>Get Location</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.buttonContainer}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    width: "29%",
                    borderWidth: 3,
                    borderRadius: 12,
                    borderColor: "#686B73",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Text>Select Hobbies</Text>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    width: "69%",
                    borderWidth: 3,
                    borderRadius: 12,
                    borderColor: "#686B73",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Picker
                  selectedValue={this.state.hobbies}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setSelectedValue(itemValue)
                  }
                >
                  <Picker.Item label="Dancing" value="Dancing" />
                  <Picker.Item label="Singing" value="Singing" />
                  <Picker.Item label="Reading" value="Reading" />
                  <Picker.Item label="Travelling" value="Travelling" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <FloatingLabelInput
              //  style={[styles.container,{marginBottom:10}]}
              label="Contact Number"
              value={this.state.contact}
              mask="1234567890"
              keyboardType="numeric"
              onChangeText={(value) => this.setState({ contact: value })}
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              this.add();
              this.props.navigation.navigate("DetailsScreen");
            }}
          >
            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "pink",

    width: "90%",
    height: 45,
    marginBottom: 30,
    flexDirection: "column",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop:20
  },
  btnForgotPassword: {
    height: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#FF62CE",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    width: 120,
    height: 45,
    elevation: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  bgImage: {
    flex: 1,

    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  btnText: {
    color: "#686B73",
    fontWeight: "bold",
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: "white",
  },
});

export default SettingsScreen;
