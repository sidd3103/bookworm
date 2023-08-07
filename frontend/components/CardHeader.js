import { View, Text, Image } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function CardHeader({ card }) {
  const { generic_user_img } = useAuth();

  return (
    <View className="flex-row items-center mt-2 ml-3 mb-4">
      <Image
        source={card.image ? { uri: card.image } : generic_user_img}
        className="h-20 w-20 rounded-full mr-10"
      />
      <Text className="text-center text-3xl font-semibold">
        {card.first_name && card.last_name
          ? `${card.first_name} ${card.last_name}`
          : card.username}
      </Text>
    </View>
  );
}
