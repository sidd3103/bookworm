import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import axios from "axios";
const _ = require("lodash");
import { Entypo } from "@expo/vector-icons";
import { useInterval } from "../hooks/useInterval";

const HomeScreen = ({ navigation }) => {
  const { bg_image, PORT, userKeys, setUser, user } = useAuth();
  const swiperRef = useRef(null);
  const [n, setN] = useState(0);

  const checkMatchesLen = async () => {
    try {
      let r = await axios(`${PORT}/api/users/${user.username}`);
      let u = _.pick(r.data, userKeys);
      if (u.matches_prev_len < u.matches.length) {
        let newMatchedUserName = u.matches.slice(-1);
        let newMatches = u.matches;
        newMatches.unshift(newMatches.pop());
        let response = await axios(`${PORT}/api/users/${newMatchedUserName}`);
        let newMatchedUser = _.pick(response.data, userKeys);
        updatedUser = {
          ...u,
          matches_prev_len: u.matches_prev_len + 1,
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

  useInterval(checkMatchesLen, 10000);

  return (
    <ImageBackground className="flex-1" resizeMode="cover" source={bg_image}>
      <SafeAreaView className="flex-1">
        <Header navigation={navigation} />
        <UserCard swiperRef={swiperRef} />
        <View className="flex flex-row justify-evenly mt-12">
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
            <Entypo name="thumbs-up" color="green" size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
