import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-deck-swiper";
import useAuth from "../hooks/useAuth";
import { Entypo, AntDesign } from "@expo/vector-icons";

const UserCard = ({ swiperRef }) => {
  const { getUsers, profiles, passOrMatch } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  const renderCard = (card, index) => {
    return (
      <View key={card.id} className="relative bg-red-500 h-3/4 rounded-xl">
        <Image
          source={{ uri: card.image }}
          className="absolute top-0 h-full w-full rounded-xl"
        />
      </View>
    );
  };

  return (
    <View className="flex-1 -mt-6">
      {profiles.length === 0 ? (
        <Text>Loading</Text>
      ) : (
        <Swiper
          ref={swiperRef}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          animateCardOpacity
          cardIndex={0}
          cards={profiles}
          verticalSwipe={false}
          renderCard={renderCard}
          onSwipedLeft={(cardIdx) =>
            passOrMatch(profiles[cardIdx].username, "PASS")
          }
          onSwipedRight={(cardIdx) =>
            passOrMatch(profiles[cardIdx].username, "MATCH")
          }
          backgroundColor={"#4FD0E9"}
        />
      )}
    </View>
  );
};

export default UserCard;
