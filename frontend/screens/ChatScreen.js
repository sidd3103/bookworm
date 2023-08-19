import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import useAuth from "../hooks/useAuth";
import ChatList from "../components/ChatList";

/**
 * This is the screen that displays all your active chats with people you have matched.
 */
const ChatScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const { user, bg_image } = useAuth();

  useEffect(() => {
    setMatches(user.matches);
  }, [user]);

  return (
    <ImageBackground source={bg_image} resizeMode="cover" className="flex-1">
      <SafeAreaView>
        <ChatHeader title="Chat" navigation={navigation} />
        <ChatList />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChatScreen;
