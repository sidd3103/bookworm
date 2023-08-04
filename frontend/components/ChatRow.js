import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
const _ = require("lodash");

const ChatRow = ({ matchUserName }) => {
  const { PORT, generic_user_img, userKeys } = useAuth();
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await axios(`${PORT}/api/users/${matchUserName}`);
        setUser(_.pick(response.data, userKeys));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.cardShadow}
      onPress={() =>
        navigation.navigate("message", {
          matchedUser: user,
        })
      }
    >
      <Image
        source={user.image ? { uri: user.image } : generic_user_img}
        className="rounded-full w-16 h-16 mr-4"
      />
      <View>
        <Text className="text-lg font-semibold">{user.username}</Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
