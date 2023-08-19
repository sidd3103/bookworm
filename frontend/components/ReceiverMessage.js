import { View, Text, Image } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

/**
 *
 * @props message: Message to be rendered
 * @returns : a receiver message component
 */

const ReceiverMessage = ({ message }) => {
  const { generic_user_img } = useAuth();
  return (
    <View
      className="bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14"
      style={{ alignSelf: "flex-start" }}
    >
      <Image
        source={message.image ? { uri: message.image } : generic_user_img}
        className="h-12 w-12 rounded-full absolute top-0 -left-14"
      />
      <Text className="text-white">{message.content}</Text>
    </View>
  );
};

export default ReceiverMessage;
