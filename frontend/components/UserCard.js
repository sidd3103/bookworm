import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-deck-swiper";
import useAuth from "../hooks/useAuth";
import CardHeader from "./CardHeader";

const UserCard = ({ swiperRef }) => {
  const { getUsers, profiles, passOrMatch } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  const renderOne = (i, idx) => {
    return (
      <View key={idx} className="rounded-xl p-2 mx-2 my-1 bg-purple-100">
        <Text className="text-center text-base">{i}</Text>
      </View>
    );
  };

  const renderCard = (card) => {
    return (
      <View
        key={card.id}
        className="bg-white h-3/4 rounded-xl"
        style={styles.cardShadow}
      >
        <CardHeader card={card} />

        <Text className="font-bold text-xl text-center">Favourites</Text>
        <View className="flex-row flex-wrap">
          {card.books.favourites.map(renderOne)}
        </View>

        <Text className="font-bold text-xl text-center">Genres</Text>
        <View className="flex-row flex-wrap">
          {card.books.genres.map(renderOne)}
        </View>

        <Text className="font-bold text-xl text-center">Currently Reading</Text>
        <View className="flex-row flex-wrap">
          {card.books.currently_reading.map(renderOne)}
        </View>

        <Text className="font-bold text-xl text-center">Bucket List</Text>
        <View className="flex-row flex-wrap">
          {card.books.bucket_list.map(renderOne)}
        </View>
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

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.31,
    elevation: 2,
  },
});

export default UserCard;
