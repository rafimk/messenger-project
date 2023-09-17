import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Home");
        }
      } catch (error) {
        console.log("Error ", error);
      }
    }

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password
    }

    await axios.post("http://10.0.2.2:8000/login", user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);

      navigation.navigate("Home")
    }).catch((error) => {
      Alert.alert("Login Error", "Invalid email or password");
      console.log("Login error ", error);
    })
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center"
      }}>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>Sign In</Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>Sign in to your account</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "gray", padding: 10 }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={
                {
                  fontSize: email ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300
                }}
              placeholderTextColor={"black"}
              placeholder="Enter your email"></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "gray", padding: 10 }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={
                {
                  fontSize: password ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 300
                }}
              placeholderTextColor={"black"}
              placeholder="Password"></TextInput>
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15, marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6
            }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView >
    </View >
  )
}

export default LoginScreen

const styles = StyleSheet.create({})