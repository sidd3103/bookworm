import {
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

/**
 * This is the starting point of the app, where users can either choose to login or register.
 */

const StartScreen = ({ navigation }) => {
  const { bg_image, logo_img } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1 justify-end items-center"
        resizeMode="cover"
        source={bg_image}
      >
        <Image source={logo_img} className="h-60 w-60 mb-56" />

        <TouchableOpacity
          className="w-52 bg-white p-4 rounded-2xl mb-5"
          style={{ marginHorizontal: "25%" }}
          onPress={() => navigation.navigate("login")}
        >
          <Text className="font-bold text-center">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-52 bg-white p-4 rounded-2xl mb-32 mt-5"
          style={{ marginHorizontal: "25%" }}
          onPress={() => navigation.navigate("register")}
        >
          <Text className="font-bold text-center">Register</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default StartScreen;
