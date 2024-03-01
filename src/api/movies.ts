import { backClient, movieClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";

export const getAllMovies = async (page: number) => {
  try {
    const movies = await movieClient().get(
      `movie/popular?language=en-US&page=${page}`
    );

    return movies;
  } catch (error) {
    return error;
  }
};

export const getMoviesByNameApi = async (name: string) => {
  try {
    const movies = await movieClient().get(`search/movie?query=${name}`);

    return movies;
  } catch (error) {
    return error;
  }
};

export const validateRentalPermissionApi = async (docNum: string) => {
  try {
    const data = {
      docNum,
    };

    const res = await backClient().post(
      Routes.VALIDATE_RENTAL_PERMISSION,
      data
    );

    return res;
  } catch (error) {
    return error;
  }
};

export const createLocationApi = async (
  docNum: string,
  name: string,
  movie: string
) => {
  try {
    const data = {
      docNum,
      customer: name,
      movie,
    };

    const res = await backClient().post(Routes.SAVE_LOCATION, data);

    return res;
  } catch (error) {
    return error;
  }
};
