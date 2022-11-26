import axios from "axios";
import { storeGetToken } from "../Auth/user";
import {
  addPetUrl,
  adoptPetUrl,
  getPeByQueryUrl,
  getPetUrl,
  returnPetUrl,
  savePetUrl,
  updatePetUrl,
} from "../Lib/config";

export const savePetService = async (id, isSave, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    let resp = null;
    if (isSave) {
      resp = await axios.post(savePetUrl(id), null, config);
    } else {
      resp = await axios.delete(savePetUrl(id), config);
    }
    callback();
  } catch (error) {
    throw error;
  }
};

export const adoptPetService = async (id, isAdopt, callback) => {
  try {
    const data = { adoptionStatus: isAdopt ? "Adopted" : "Fostered" };
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };

    const resp = await axios.post(adoptPetUrl(id), data, config);
    callback(resp.data.data);
    return;
  } catch (error) {
    throw error;
  }
};

export const returnPetService = async (id, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    const resp = await axios.post(returnPetUrl(id), null, config);

    const pet = resp.data.data;
    callback(pet);
  } catch (error) {
    throw error;
  }
};

export const addPetService = async (data, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    const resp = await axios.post(addPetUrl, data, config);
    const { _id } = resp.data.data;
    callback(_id);
  } catch (error) {
    throw error;
  }
};

export const updatePetById = async (id, reqData, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };

    const resp = await axios.put(updatePetUrl(id), reqData, config);
    const petData = resp.data.data;
    callback(petData);
  } catch (error) {
    throw error;
  }
};

export const getPetsByQueryService = async (query, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };

    const resp = await axios.get(getPeByQueryUrl(query), config);
    const petData = resp.data.data;
    callback(petData);
  } catch (error) {
    throw error;
  }
};

export const getPetByIdService = async (id, callback) => {
  try {
    const config = {
      headers: {
        authorization: storeGetToken(),
      },
    
    };
    const resp = await axios.get(getPetUrl(id), config);
    const petData = resp.data.data;
    callback(petData);
  } catch (error) {
    throw error;
  }
};
