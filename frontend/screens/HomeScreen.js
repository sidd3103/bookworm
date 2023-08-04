import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import axios from "axios";
const _ = require("lodash");
import { Entypo, AntDesign } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const { bg_image, user, PORT, userKeys, setUser } = useAuth();
  const swiperRef = useRef(null);

  useEffect(() => {
    const checkMatchesLen = async () => {
      try {
        if (user.matches_prev_len < user.matches.length) {
          let newMatchedUserName = user.matches.slice(-1);
          let newMatches = user.matches;
          newMatches.unshift(newMatches.pop());
          let response = await axios(`${PORT}/api/users/${newMatchedUserName}`);
          let newMatchedUser = _.pick(response.data, userKeys);
          updatedUser = {
            ...user,
            matches_prev_len: user.matches_prev_len + 1,
            matches: newMatches,
          };
          setUser(updatedUser);
          await axios.put(`${PORT}/api/users/${user.username}`, updatedUser);
          navigation.navigate("match", {
            user: updatedUser,
            matchedUser: newMatchedUser,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkMatchesLen();
  });

  return (
    <ImageBackground className="flex-1" resizeMode="cover" source={bg_image}>
      <SafeAreaView className="flex-1">
        <Header navigation={navigation} />
        <UserCard swiperRef={swiperRef} />
        <View className="flex flex-row justify-evenly bottom-10">
          <TouchableOpacity
            className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
            onPress={() => swiperRef.current.swipeLeft()}
          >
            <Entypo name="cross" color="red" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
            onPress={() => swiperRef.current.swipeRight()}
          >
            <AntDesign name="heart" color="green" size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
