import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const navigation = useNavigation();

    const handleRegister = async () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image
        }

        // Send a post request to the backend API to register the user.
        await axios.post("http://10.0.2.2:8000/register", user).then((response) => {
            console.log(response);
            Alert.alert(
                "Registration successful",
                "You have been registerd successfully"
            );
            setName("");
            setEmail("");
            setPassword("");
            setImage("");
        }).catch((error) => {
            Alert.alert(
                "Registration error",
                "An error occured while registering"
            )
            console.log("Registration failed ", error);
        });
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            padding: 10,
            alignItems: "center"
        }}>
            <KeyboardAvoidingView>
                <View style={{
                    marginTop: 100,
                    justifyContent: "center", alignItems: "center"
                }}>
                    <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>Register</Text>
                    <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>Register to your account</Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "gray", padding: 10 }}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={
                                {
                                    fontSize: name ? 18 : 18,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300
                                }}
                            placeholderTextColor={"black"}
                            placeholder="Enter your name"></TextInput>
                    </View>
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

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "gray", padding: 10 }}>Image</Text>
                        <TextInput
                            value={image}
                            onChangeText={(text) => setImage(text)}
                            style={
                                {
                                    fontSize: image ? 18 : 18,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300
                                }}
                            placeholderTextColor={"black"}
                            placeholder="Image"></TextInput>
                    </View>
                </View>

                <Pressable
                    onPress={handleRegister}
                    style={{
                        width: 200,
                        backgroundColor: "#4A55A2",
                        padding: 15, marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 6
                    }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>Already have an account Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView >
        </View >
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})