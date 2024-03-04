import { zipCodeClient } from "@/clients/AxiosClient";
import { IViaCepApi } from "@/utils/interfaces";

export const getAdress = async (zipCode: string): Promise<IViaCepApi> => {
  try {
    const adress = await zipCodeClient().get(`${zipCode}/json`);

    return adress.data;
  } catch (error: any) {
    return error;
  }
};
