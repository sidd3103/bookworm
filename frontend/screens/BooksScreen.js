import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const BooksScreen = ({ navigation }) => {
  const { user, logo_img, PORT, setUser } = useAuth();

  const [current, setCurrent] = useState(
    user.books.currently_reading.toString()
  );
  const [favs, setFavs] = useState(user.books.favourites.toString());

  const [bucketList, setBucketList] = useState(
    user.books.bucket_list.toString()
  );
  const [genres, setGenres] = useState(user.books.genres.toString());

  const updateBooks = async () => {
    try {
      updatedBooks = {
        favourites: favs.split(",", 5),
        bucket_list: bucketList.split(",", 5),
        genres: genres.split(",", 5),
        currently_reading: current.split(",", 5),
      };

      updatedUser = {
        ...user,
        books: updatedBooks,
      };

      await axios.put(`${PORT}/api/users/${user.username}`, updatedUser);
      setUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center pt-5">
      <Image source={logo_img} resizeMode="contain" className="h-20 w-full" />
      <Text className="text-3xl text-gray-500 pt-2 pb-16 font-bold">Books</Text>
      <Text className="text-center p-4 font-bold text-purple-400 text-xl">
        What genres do you like?
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Comma separated values (max 5)"
        value={genres}
        onChangeText={setGenres}
      />

      <Text className="text-center p-4 font-bold text-purple-400 text-xl">
        What are your favourite books?
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Comma separated values (max 5)"
        value={favs}
        onChangeText={setFavs}
      />

      <Text className="text-center p-4 font-bold text-purple-400 text-xl">
        What books are on your bucketlist?
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Comma separated values (max 5)"
        value={bucketList}
        onChangeText={setBucketList}
      />

      <Text className="text-center p-4 font-bold text-purple-400 text-xl">
        What books are you currently reading?
      </Text>
      <TextInput
        className="text-center text-lg pb-2"
        placeholder="Comma separated values (max 5)"
        value={current}
        onChangeText={setCurrent}
      />

      <TouchableOpacity
        className="w-64 p-3 rounded-xl absolute bottom-10 bg-purple-400"
        onPress={updateBooks}
      >
        <Text className="text-center text-white text-xl">Update Book Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BooksScreen;
