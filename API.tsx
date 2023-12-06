////////////REST API for the great cat images///////////////

import axios from "axios";

///////////////////////////////////////////////////////////////////7777

/*--fetching cat images from thecatapi.com--*/

const API_KEY = "************************************";
const API_URL = "https://api.thecatapi.com/v1/images/search";

export const fetchCatImages = async (page: number) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "x-api-key": API_KEY },
      params: {
        limit: 48,
        offset: (page - 1) * 48,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error loading images", error);
    throw error;
  }
};
