import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import useAuth from "../hooks/useAuth";
import ChatList from "../components/ChatList";

const ChatScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setMatches(user.matches);
  }, [user]);

  return (
    <SafeAreaView>
      <ChatHeader title="Chat" navigation={navigation} />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
