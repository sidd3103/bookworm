import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";

import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

/**
 * This screen is where the user can change it's profile, such as firstname, lastname, profile picture, email, etc.
 */

const ModalScreen = ({ navigation }) => {
  const { user, logo_img, PORT, setUser } = useAuth();
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const incompleteForm = !email || !age || !firstName || !lastName;

  /**
   * This method sends a put request to the backend to change the user's profile settings
   */
  const update = async () => {
    try {
      let updatedUser = {
        ...user,
        email,
        age,
        first_name: firstName,
        last_name: lastName,
        bio: bio,
      };

      await axios.put(`${PORT}/api/users/${user.username}`, updatedUser);
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      className="flex-1 pt-1"
      contentContainerStyle={{ alignItems: "center" }}
      onPress={Keyboard.dismiss}
    >
      <Image source={logo_img} resizeMode="contain" className="h-20 w-full" />
      <Text className="text-3xl text-gray-500 pt-2 pb-16 font-bold">
        Settings
      </Text>

      <Text className="text-center p-4 font-bold text-purple-600 text-xl">
        First Name
      </Text>
      <TextInput
        className="text-center text-lg pb-2 pt-1"
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text className="text-center p-4 font-bold text-purple-600 text-xl">
        Last Name
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text className="text-center p-4 font-bold text-purple-600 text-xl">
        Profile Picture
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Enter a profile pic URL"
        value={image}
        onChangeText={setImage}
      />

      <Text className="text-center p-4 font-bold text-purple-600 text-xl">
        Email Address
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text className="text-center p-4 font-bold text-purple-600 text-xl">
        Age
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Enter your age"
        keyboardType="number-pad"
        value={age.toString()}
        onChangeText={setAge}
      />

      <TouchableOpacity
        className="w-32 p-3 m-10 rounded-xl bg-purple-500 mt-5"
        onPress={() => navigation.navigate("books")}
      >
        <Text className="text-center text-white font-semibold">Add Books</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={incompleteForm}
        className={`w-64 p-3 rounded-xl -mt-3 ${
          incompleteForm ? "bg-gray-400" : "bg-purple-700"
        }`}
        onPress={() => update(firstName, lastName, image, email, age)}
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ModalScreen;
