import { backClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";
import { IFilter, UseForm } from "@/utils/interfaces";

export const createUserApi = async (
  userForm: UseForm,
  permissions: string[]
) => {
  try {
    const data = {
      permissions,
      userForm,
    };

    const res = await backClient().post(Routes.SAVE_USER, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const getAllUsersApi = async (
  page: number,
  itemsPerPage: number,
  permissions: string[]
) => {
  try {
    const data = {
      permissions,
      page,
      itemsPerPage,
    };

    const res = await backClient().post(Routes.GET_ALL_USERS, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const gettAllNamesApi = async (permissions: string[]) => {
  try {
    const data = {
      permissions,
    };

    const res = await backClient().post(Routes.GET_ALL_NAMES, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const gettAllDocNumbersApi = async (permissions: string[]) => {
  try {
    const data = {
      permissions,
    };

    const res = await backClient().post(Routes.GET_ALL_DOCNUMBERS, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const getUsersByNameOrDocNumApi = async (
  userFilter: Partial<IFilter>
) => {
  try {
    const data: Partial<IFilter> = {};

    for (const key in userFilter) {
      if (userFilter[key as keyof IFilter]) {
        data[key as keyof IFilter] = userFilter[key as keyof IFilter];
      }
    }

    const res = await backClient().post(
      Routes.GET_USER_BY_NAME_OR_DOCNUM,
      data
    );

    return res;
  } catch (error) {
    return error;
  }
};

export const updateUserApi = async (user: UseForm, id: string) => {
  try {
    const data: Partial<UseForm> = {};

    for (const key in user) {
      if (
        user[key as keyof UseForm] !== undefined &&
        user[key as keyof UseForm] !== ""
      ) {
        data[key as keyof UseForm] = user[key as keyof UseForm];
      }
    }

    const res = await backClient().put(`${Routes.UPDATE_USER}${id}`, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const deleteUserApi = async (id: string) => {
  try {
    const res = await backClient().put(`${Routes.DELETE_USER}${id}`);

    return res;
  } catch (error) {
    return error;
  }
};
