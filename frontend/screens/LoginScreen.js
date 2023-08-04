import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = ({ navigation }) => {
  const { bg_image, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1">
      <ImageBackground className="flex-1" resizeMode="cover" source={bg_image}>
        <TextInput
          className="bg-white absolute top-40 w-52 rounded-2xl p-4"
          style={{ marginHorizontal: "25%" }}
          placeholder="username"
          value={username}
          onChangeText={(t) => setUsername(t)}
        />
        <TextInput
          className="bg-white absolute top-80 w-52 rounded-2xl p-4"
          style={{ marginHorizontal: "25%" }}
          placeholder="password"
          value={password}
          onChangeText={(t) => setPassword(t)}
        />
        <TouchableOpacity
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
          style={{ marginHorizontal: "25%" }}
          onPress={() => login(username, password)}
        >
          <Text className="font-bold text-center">Sign In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
