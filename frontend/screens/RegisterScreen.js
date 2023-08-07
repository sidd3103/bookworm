import {
  Text,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const { bg_image, logo_img, PORT } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        <View className="flex-row">
          <TextInput
            className="bg-white w-72 rounded-2xl p-4 mt-10"
            style={{ marginHorizontal: "25%" }}
            secureTextEntry={!showConfirmPassword}
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            className="absolute right-32 bottom-3"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesome5
              name={showConfirmPassword ? "eye-slash" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Text className="absolute bottom-60 left-20 text-red-600">
          {confirmPassword !== password ? "Passwords don't match" : ""}
        </Text>

        <TouchableOpacity
          className="w-52 bg-white p-4 rounded-2xl mb-32 mt-20"
          style={{ marginHorizontal: "25%" }}
          onPress={register}
          disabled={confirmPassword !== password || !username || !password}
        >
          <Text className="font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;
