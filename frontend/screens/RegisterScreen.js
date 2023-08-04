import {
  Text,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const RegisterScreen = ({ navigation }) => {
  const { bg_image } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        `${PORT}/api/users`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      navigation.navigate("start");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground className="flex-1" resizeMode="cover" source={bg_image}>
      <SafeAreaView>
        <TextInput
          className="bg-white w-52 rounded-2xl p-4"
          style={{ marginHorizontal: "25%" }}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="bg-white w-52 rounded-2xl p-4"
          style={{ marginHorizontal: "25%" }}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          className="bg-white w-52 rounded-2xl p-4"
          style={{ marginHorizontal: "25%" }}
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          disabled={confirmPassword !== password}
          className={`${
            confirmPassword === password ? "big-white-500" : "bg-gray-400"
          } p-4 rounded-2xl`}
          style={{ marginHorizontal: "25%" }}
          onPress={() => register(username, password)}
        >
          <Text className="font-bold text-center">Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
