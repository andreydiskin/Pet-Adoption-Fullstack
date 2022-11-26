import axios from "axios";
import { storeGetToken } from "../Auth/user";
import { meUrl } from "./config";



export const fetchUrl = (url) => {
  return new Promise((res, rej) => {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
   
    };

    axios
      .get(meUrl, config)
      .then((resp) => {
        console.log("resp",resp);
        res(resp.data.data);
      })
      .catch((resp) => {
        console.log("resp",resp);

        rej(resp.response.data.message);
      });
  });
};
