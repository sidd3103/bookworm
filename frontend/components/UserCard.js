import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-deck-swiper";
import useAuth from "../hooks/useAuth";
import CardHeader from "./CardHeader";
import axios from "axios";
const _ = require("lodash");
const sad = require("../assets/sad.png");
const loading_gif = require("../assets/loading.gif");

const UserCard = ({ swiperRef }) => {
  const { passOrMatch, user, PORT, userKeys } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [finished, setFinished] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * This method gets all the users that we haven't already swiped or passed
     */
    const getUsers = async () => {
      try {
        setLoading(true);
        let response = await axios(`${PORT}/api/users`);
        let users = response.data.filter((u) => u.username !== user.username);
        users = users.filter(
          (u) =>
            !user.passes_swipes.passes.includes(u.username) &&
            !user.passes_swipes.swipes.includes(u.username)
        );
        users = users.map((u) => _.pick(u, userKeys));
        setProfiles(users);
        setFinished(users.length === 0);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
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
        className="bg-white h-5/6 rounded-xl -mt-5"
        style={styles.cardShadow}
      >
        <CardHeader card={card} />

        <Text className="font-bold text-xl text-center -mt-4">Favourites</Text>
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
      {loading ? (
        <View className="flex justify-center items-center mt-64">
          <Image className="h-40 w-40" source={loading_gif} />
          <Text className="mt-2 text-2xl font-semibold">Loading Profiles</Text>
        </View>
      ) : finished ? (
        <View className="flex justify-center items-center mt-64">
          <Image className="h-40 w-40" source={sad} />
          <Text className="mt-10 text-4xl font-semibold">No More Profiles</Text>
        </View>
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
          onSwipedAll={() => setFinished(true)}
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
