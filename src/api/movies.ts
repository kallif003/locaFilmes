import { backClient, movieClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";
import { ILocationFilter } from "@/utils/interfaces";

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

export const getAllLocationApi = async (page: number) => {
  try {
    const data = {
      page,
    };

    const res = await backClient().post(Routes.GET_ALL_LOCATION, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const returnMovieApi = async (id: string) => {
  try {
    const res = await backClient().put(`${Routes.RETURN_MOVIE}${id}`);

    return res;
  } catch (error) {
    return error;
  }
};

export const getLocationByFilter = async (location: ILocationFilter) => {
  try {
    const data: Partial<ILocationFilter> = {};

    for (const key in location) {
      if (location[key as keyof ILocationFilter]) {
        data[key as keyof ILocationFilter] =
          location[key as keyof ILocationFilter];
      }
    }

    const res = await backClient().post(Routes.GET_LOCATION_BY_FILTER, data);

    return res;
  } catch (error) {
    return error;
  }
};
