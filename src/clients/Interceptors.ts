import { removeItems } from "@/utils/permissions";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const handleRequest = async (
  options: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  return options;
};

export const handleResponse = async (
  response: AxiosResponse
): Promise<AxiosResponse<any, any>> => {
  if (response.status === 401) {
    alert("Sessão expirado, logo novamente");
    location.href = "/";
    removeItems();
  }

  return response;
};

export const handleError = (error: any): Promise<never> => {
  return Promise.reject(error);
};

export const interceptors = {
  handleRequest,
  handleResponse,
  handleError,
};
