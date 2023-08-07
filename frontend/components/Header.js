import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  const { user, logo_img, generic_user_img, logout } = useAuth();

  return (
    <View className="flex-row items-center justify-between px-8">
      <TouchableOpacity onPress={logout}>
        <Image
          source={user.image ? { uri: user.image } : generic_user_img}
          className="h-10 w-10 rounded-full"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("modal")}>
        <Image source={logo_img} className="h-14 w-14" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("chat")}>
        <Ionicons name="chatbubbles-sharp" size={30} color="purple" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
