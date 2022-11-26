import axios from "axios";
import { storeGetToken } from "../Auth/user";
import { loginUrl, uploadUrl } from "../Lib/config";

export const loginApiCall = async (data, callback, isModalOpen) => {
  try {
    const resp = await axios.post(loginUrl, data);

    const { access_token } = resp.data.data;
    callback(access_token);
    isModalOpen(false);
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (target) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    };

    const file = target.files[0];

    const formData = new FormData();

    formData.set("image", file);

    const resp = await axios.post(
      uploadUrl,
      formData,
      config
    );

    return resp.data;
  } catch (error) {
    throw error;
  }
};
