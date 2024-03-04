import { backClient } from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";
import { ClientForm } from "@/utils/interfaces";

export const createClientApi = async (clientForm: ClientForm) => {
  try {
    const data = {
      clientForm,
    };

    const res = await backClient().post(Routes.SAVE_CUSTOMER, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const getAllClientsApi = async (page: number, itemsPerPage: number) => {
  try {
    const data = {
      page,
      itemsPerPage,
    };

    const res = await backClient().post(Routes.GET_ALL_CUSTOMER, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const getAllClientNamesApi = async () => {
  try {
    const res = await backClient().get(Routes.GET_ALL_CUSTOMER_NAMES);

    return res;
  } catch (error) {
    return error;
  }
};

export const getAllDocNumbersApi = async () => {
  try {
    const res = await backClient().get(Routes.GET_ALL_CUSTOMER_DOCNUMBERS);

    return res;
  } catch (error) {
    return error;
  }
};

export const getClientByNameOrDocNumOrStatusApi = async (
  name: string | null,
  docNum: string | null,
  status: string | null
) => {
  try {
    const data = {
      name,
      docNum,
      status,
    };

    const res = await backClient().post(
      Routes.GET_CUSTOMER_BY_NAME_OR_DOCNUM_OR_STATUS,
      data
    );

    return res;
  } catch (error) {
    return error;
  }
};

export const updateClientApi = async (client: ClientForm, id: string) => {
  try {
    const data: Partial<ClientForm> = {};

    for (const key in client) {
      if (
        client[key as keyof ClientForm] !== undefined &&
        client[key as keyof ClientForm] !== ""
      ) {
        data[key as keyof ClientForm] = client[key as keyof ClientForm];
      }
    }

    const res = await backClient().put(`${Routes.UPDATE_CUSTOMER}${id}`, data);

    return res;
  } catch (error) {
    return error;
  }
};

export const deleteClientApi = async (id: string) => {
  try {
    const res = await backClient().put(`${Routes.DELETE_CUSTOMER}${id}`);

    return res;
  } catch (error) {
    return error;
  }
};
