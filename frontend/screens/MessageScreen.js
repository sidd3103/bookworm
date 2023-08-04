import {
  View,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ChatHeader from "../components/ChatHeader";
import useAuth from "../hooks/useAuth";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import axios from "axios";

const MessageScreen = ({ navigation }) => {
  const { params } = useRoute();
  const { matchedUser } = params;
  const { user, generatePairString, PORT } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const matchId = generatePairString(user.username, matchedUser.username);
  const [n, setN] = useState(0);

  const sendMessage = async () => {
    try {
      await axios.post(`${PORT}/api/matches/${matchId}`, {
        content: input,
        sender: user.username,
        image: user.image,
      });
      setInput("");
      setN(n + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let response = await axios(`${PORT}/api/matches/${matchId}`);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [n]);

  return (
    <SafeAreaView className="flex-1">
      <ChatHeader title={matchedUser.username} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            className="pl-4"
            data={messages}
            keyExtractor={(i, idx) => idx}
            renderItem={({ item: message }) =>
              message.sender === user.username ? (
                <SenderMessage message={message} />
              ) : (
                <ReceiverMessage message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            value={input}
            placeholder="Send input..."
            onChangeText={setInput}
            className="h-10 text-lg"
          />

          <Button title="Send" color="purple" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
