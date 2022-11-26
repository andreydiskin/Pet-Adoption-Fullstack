import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
  getAllUsersUrl,
  getFullUsersDataUrl,
  getUserPetsAllUrl,
  signUpUrl,
  updateUserUrl,
} from "../Lib/config";

export const signUpService = async (data, isModalOpen) => {
  try {
    const resp = await axios.post(signUpUrl, data);
    isModalOpen(false);
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (id, callback, data) => {
  {
    try {
      const config = {
        headers: {
          authorization: storeGetToken(),
        },
       
      };

      const resp = await axios.put(updateUserUrl(id), data, config);
      const userData = resp.data.data;
      console.log(userData);
      callback();
    } catch (error) {
      throw error;
    }
  }
};

export const getAllUsersService = async (callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
     
    };
    const resp = await axios.get(getAllUsersUrl, config);
    const data = resp.data.data;
    callback(data);
  } catch (error) {
    throw error;
  }
};

export const getFullUserDataService = async (id, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
     
    };
    const resp = await axios.get(getFullUsersDataUrl(id), config);
    const data = resp.data.data;
    callback(data);
  } catch (error) {
    throw error;
  }
};

export const getUserPetsAll = async (userId, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
     
    };

    const resp = await axios.get(getUserPetsAllUrl(userId), config);
    const petData = resp.data.data;

    callback(petData);
  } catch (error) {
    throw error;
  }
};
