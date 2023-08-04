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
import React, { useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const StartScreen = ({ navigation }) => {
  const { bg_image, logo_img } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground className="flex-1" resizeMode="cover" source={bg_image}>
        <TouchableOpacity
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
          style={{ marginHorizontal: "25%" }}
          onPress={() => navigation.navigate("login")}
        >
          <Text className="font-bold text-center">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute bottom-20 w-52 bg-white p-4 rounded-2xl"
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
