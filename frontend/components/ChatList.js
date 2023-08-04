import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setMatches(user.matches);
  }, [user]);

  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(i, idx) => idx}
      renderItem={(i) => <ChatRow matchUserName={i.item} />}
    />
  ) : (
    <View className="p-5">
      <Text className="text-center text-lg">No matches at the moment</Text>
    </View>
  );
};

export default ChatList;
