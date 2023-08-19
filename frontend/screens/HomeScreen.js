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

  /**
   * This method is called every 10 seconds
   * It checks if a user that we already swiped right on, also swiped right on us and if they did, displays the MatchScreen
   * Basically checks for database changes
   * The matches_prev_len attribute of a user is updated only in this function.
   *
   * There's two cases when a match happens:
   * 1) We right swiped on someone that already right swiped us
   * 2) We get right swiped by someone that we already right swiped
   *
   * In the second case, when the other user right swipes us and the updateMatches() function updates our matches attribute,
   * it doesn't update the matches_prev_len attribute. So we check the length of the matches attribute with the matches_prev_len attribute
   * to see if someone right swiped us while we are still logged in to the app.
   *
   * Another use case: let's say a user logs in and while they were logged out, there were new matches. To notify the user of those matches, this function is used.
   */
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
