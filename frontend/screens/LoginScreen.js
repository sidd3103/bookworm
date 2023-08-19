import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { FontAwesome5 } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const { bg_image, logo_img, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1 items-center justify-end"
        resizeMode="cover"
        source={bg_image}
      >
        <Image source={logo_img} className="h-60 w-60" />

        <TextInput
          className="bg-white w-72 rounded-2xl p-4 mt-32"
          style={{ marginHorizontal: "25%" }}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <View className="flex-row">
          <TextInput
            className="bg-white w-72 rounded-2xl p-4 mt-10"
            style={{ marginHorizontal: "25%" }}
            secureTextEntry={!showPassword}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="absolute right-32 bottom-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome5
              name={showPassword ? "eye-slash" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="w-52 bg-white p-4 rounded-2xl mb-32 mt-20"
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
