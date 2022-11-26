export const urlBase = "https://pet-backend-andrey.herokuapp.com";

export const petsUrl = "/pets/";

export const usersUrl = "/users/";

export const meUrl =urlBase+usersUrl+"me" ;




export const addPetUrl = urlBase + petsUrl;

export const loginUrl = urlBase + usersUrl + "login";
export const signUpUrl = urlBase + usersUrl + "signup";

export const getPetUrl = (id) => urlBase + petsUrl + id;

export const getAllUsersUrl = urlBase + usersUrl;
export const getFullUsersDataUrl = (id) => urlBase + usersUrl + id + "/full";
export const getPeByQueryUrl = (query) => urlBase + petsUrl + "?" + query;
export const getUserPetsAllUrl = (id) => urlBase + petsUrl + "/user/" + id;

export const updatePetUrl = (id) => urlBase + petsUrl + id;

export const updateUserUrl = (id) => urlBase + usersUrl + id;

export const publicPicUrlBase = urlBase + "/images/";

export const imagesBaseUrl = `https://pet-app-images.s3.eu-west-2.amazonaws.com/`;

export const editPetBaseUrl = "/pets/edit/";

export const savePetUrl = (id) => urlBase + petsUrl + `/${id}/save`;

export const returnPetUrl = (id) => urlBase + petsUrl + `/${id}/return`;

export const adoptPetUrl = (id) => urlBase + petsUrl + `/${id}/adopt`;

export const seeMorePetBaseUrl = "/search/";


export const uploadUrl = urlBase + "/upload/pet";