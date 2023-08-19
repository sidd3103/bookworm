import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const matchImg = require("../assets/match.png");

/**
 * This screen appears whenever a user matches with someone.
 */
const MatchScreen = ({ navigation }) => {
  const { params } = useRoute();
  const { user, matchedUser } = params;

  return (
    <View className="h-full bg-purple-500 pt-20" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-20 object-contain">
        <Image source={matchImg} className="h-20 w-full" />
      </View>
      <Text className="text-white text-center mt-5">
        You and {`${matchedUser.first_name} ${matchedUser.last_name}`} have
        matched!
      </Text>
      <View className="flex-row justify-evenly mt-5">
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: user.image }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: matchedUser.image }}
        />
      </View>

      <TouchableOpacity className="bg-white m-5 px-10 py-8 rounded-full mt-20">
        <Text className="text-center">Send a message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white m-5 px-10 py-8 rounded-full mt-20"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
