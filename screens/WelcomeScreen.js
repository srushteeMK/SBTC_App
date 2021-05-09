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
  TouchableWithoutFeedback ,
  KeyboardAvoidingView,
  Keyboard,
  
} from "react-native";
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      form: "login",
      fullName: "",
      confirmPassword: "",
    };
  }

  resetPassword = () => {
    firebase.auth().sendPasswordResetEmail(this.state.emailId)
    .then(() => {
     
      return Alert.alert("Password reset email sent successfully", "", [
        {
          text: "OK",
          onPress: () =>   this.setState({
            form: "login",
            emailId: "",
            password: "",
            confirmPassword: "",
            fullName: "",
          })
        }
      ]);
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage);
    });
  
  };
  login = (emailId, password) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(emailId, password)
    .then(() => {
      this.props.navigation.navigate("DetailsScreen");
        return Alert.alert("User Login Successfully")
    
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage);
    });
  };
  signUp = (emailId, password) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailId, password)
    .then(() => {
      db.collection("users").doc(this.state.emailId).set({
       
        emailId: this.state.emailId,
       
      });
     this.props.navigation.navigate('EnterDetailsScreen')
      return Alert.alert("User Added Successfully", "", [
        {
          text: "OK",
          onPress: () =>   this.setState({
            form: "login",
            emailId: "",
            password: "",
            confirmPassword: "",
          })
        }
      ]);
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage);
    });
  };
  render() {
    if (this.state.form === "login") {
      return (
          
        <View style={styles.container}>
          <Image
            style={styles.bgImage}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_vbjUwa3dih0wTTb5TMyqPxD9VtPA678Bw&usqp=CAU",
            }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={(emailId) => this.setState({ emailId: emailId })}
              value={this.state.emailId}
            />
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://img.icons8.com/nolan/40/000000/emailId.png",
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password: password })}
              value={this.state.password}
            />
            <Image
              style={styles.inputIcon}
              source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
            />
          </View>

          <TouchableOpacity
            style={styles.btnForgotPassword}
            onPress={() =>this.setState({form:"resetPassword"})}
          >
            <Text style={styles.btnText}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.login(this.state.emailId, this.state.password)}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
           //   this.onClickListener("register");
              this.setState({
                form: "register",
              });
            }}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.form === "register") {
      return (
        <KeyboardAvoidingView  style={styles.container}>
        <View style={styles.container}>
          <Image
            style={styles.bgImage}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHK4x8Gq8f1UZAaEuLNhFLnTFaV07JNQQBioE_MO05ZRoyANJ20M5B5GDmdKJGEyRu_38&usqp=CAU",
            }}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={(emailId) => this.setState({ emailId })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Confirm Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(confirmPassword) =>
                this.setState({ confirmPassword })
              }
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => {
              if (
                this.state.emailId &&
                this.state.password === this.state.confirmPassword
              ) {
                this.signUp(this.state.emailId, this.state.password);
                
              } else {
                Alert.alert("Please check your details");
              }
            }}
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableHighlight>
          <TouchableWithoutFeedback 
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => {
              this.setState({
                form: "login",
                emailId: "",
                password: "",
                confirmPassword: "",
              });
              Keyboard.dismiss
            }}
          >
            <Text style={styles.signUpText}>Cancel</Text>
          </TouchableWithoutFeedback >
        </View>
        </KeyboardAvoidingView>
      );
    }
    else if (this.state.form === "resetPassword") {
      return(
        <View style={styles.container}>
           <Image
            style={styles.bgImage}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHK4x8Gq8f1UZAaEuLNhFLnTFaV07JNQQBioE_MO05ZRoyANJ20M5B5GDmdKJGEyRu_38&usqp=CAU",
            }}
          />

            <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={(emailId) => this.setState({ emailId })}
            />
          </View>
          <TouchableOpacity 
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              this.resetPassword()
              // this.setState({
              //   form: "login",
              //   emailId: "",
              //   password: "",
              //   confirmPassword: "",
              // });
              Keyboard.dismiss
            }}
          >
            <Text style={styles.loginText}>Send Password Reset Email</Text>
          </TouchableOpacity >
          <TouchableWithoutFeedback 
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => {
              this.setState({
                form: "login",
                emailId: "",
                password: "",
                confirmPassword: "",
              });
              Keyboard.dismiss
            }}
          >
            <Text style={styles.signUpText}>Cancel</Text>
          </TouchableWithoutFeedback >
        </View>
      )

    }
  }
}

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
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
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
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
    backgroundColor: "purple",
    marginTop: 10,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  bgImage: {
    flex: 1,
    // resizeMode:"auto",

    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: "white",
  },
});
