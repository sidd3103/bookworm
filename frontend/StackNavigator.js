import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import StartScreen from "./screens/StartScreen";
import useAuth from "./hooks/useAuth";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ModalScreen from "./screens/ModalScreen";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";
import BooksScreen from "./screens/BooksScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { user } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="chat" component={ChatScreen} />
            <Stack.Screen name="message" component={MessageScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="modal" component={ModalScreen} />
            <Stack.Screen name="books" component={BooksScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="start" component={StartScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
