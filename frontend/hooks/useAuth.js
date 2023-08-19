import React, { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import { Alert } from "react-native";

const _ = require("lodash");

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const userKeys = [
    "first_name",
    "last_name",
    "email",
    "username",
    "image",
    "age",
    "passes_swipes",
    "matches",
    "matches_prev_len",
    "books",
  ];

  const generic_user_img = require("../assets/user.png");
  const logo_img = require("../assets/logo.png");
  const PORT = "http://10.0.0.199:8000";
  const bg_image = {
    uri: "https://img.freepik.com/free-photo/design-space-paper-textured-background_53876-42776.jpg?w=2000&t=st=1691128720~exp=1691129320~hmac=4f67bcb4a8eaa6c3de497021fdcbe1067a6e3e885236a39a246a2d0dc34fcc2b",
  };

  /**
   *
   * @param {*} s1: string username 1
   * @param {*} s2: string username 2
   * @returns string : the unique match id of two users. It's unique because usernames are always unique
   */
  const generatePairString = (s1, s2) => {
    return s1 > s2 ? `${s1}+${s2}` : `${s2}+${s1}`;
  };

  /**
   * This function logs the user out
   */
  const logout = () => {
    setTokens(null);
    setUser(null);
  };

  /**
   *
   * @param {*} username: string
   * @param {*} password: string
   * This method sends a post request to the backend to log in a user if the credentials match (JWT Authentication)
   */
  const login = async (username, password) => {
    try {
      let response = await axios.post(
        `${PORT}/api/token/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let decoded = jwt_decode(response.data.access);
      decoded = _.pick(decoded, userKeys);
      setTokens(response.data);
      setUser(decoded);
      navigation.navigate("home");
    } catch (error) {
      if (error.response.status === 401) {
        Alert.alert("Incorrect username/password combination");
      }
    }
  };

  /**
   *
   * @param {*} currentUser: object
   * @param {*} matchedUser: object
   * This function updates the matches attribute for both the users (the one we swiped right on, and the user that swiped right on us)
   */
  const updateMatches = async (currentUser, matchedUser) => {
    try {
      let matchesForCurrentUser = [
        ...currentUser.matches,
        matchedUser.username,
      ];
      let matchesForMatchedUser = [
        ...matchedUser.matches,
        currentUser.username,
      ];

      setUser({
        ...currentUser,
        matches: matchesForCurrentUser,
        matches_prev_len: currentUser.matches_prev_len + 1,
      });

      await await axios.put(`${PORT}/api/users/${currentUser.username}`, {
        ...currentUser,
        matches: matchesForCurrentUser,
        matches_prev_len: currentUser.matches_prev_len + 1,
      });

      await axios.put(`${PORT}/api/users/${matchedUser.username}`, {
        ...matchedUser,
        matches: matchesForMatchedUser,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} passedUserName username of the user we swiped right on
   * @param {*} updatedUser current user with the updated passes_swipes attribute
   * This method checks if the user we swiped right on, also right swiped us
   */
  const checkMatch = async (passedUserName, updatedUser) => {
    try {
      let response = await axios(`${PORT}/api/users/${passedUserName}`);
      let matchedUser = response.data;
      matchedUser = _.pick(matchedUser, userKeys);
      if (matchedUser.passes_swipes.swipes.includes(updatedUser.username)) {
        updateMatches(updatedUser, matchedUser);

        await axios.post(`${PORT}/api/matches`, {
          id: generatePairString(updatedUser.username, passedUserName),
        });

        navigation.navigate("match", {
          user: updatedUser,
          matchedUser,
        });
      } else {
        setUser(updatedUser);
        await axios.put(`${PORT}/api/users/${user.username}`, updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} passedUserName: string, username of the user that the current user swiped left/right on
   * @param {*} fun: string ['PASS', 'MATCH']
   * This method updates the pass/swipe attribute of the current user
   */
  const passOrMatch = async (passedUserName, fun) => {
    try {
      let users =
        fun === "PASS" ? user.passes_swipes.passes : user.passes_swipes.swipes;
      users = [...users, passedUserName];

      const new_passes_swipes =
        fun === "PASS"
          ? {
              ...user.passes_swipes,
              passes: users,
            }
          : {
              ...user.passes_swipes,
              swipes: users,
            };

      const updatedUser = { ...user, passes_swipes: new_passes_swipes };

      if (fun === "PASS") {
        setUser(updatedUser);
        await axios.put(`${PORT}/api/users/${user.username}`, updatedUser, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      } else {
        checkMatch(passedUserName, updatedUser);
      }
      // setProfiles(profiles.filter((p) => p.username !== passedUserName));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        bg_image,
        logo_img,
        generic_user_img,
        passOrMatch,
        PORT,
        userKeys,
        generatePairString,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
