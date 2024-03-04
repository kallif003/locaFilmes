import { IAxiosClient } from "@/utils/interfaces";
import axios, { AxiosInstance } from "axios";
import { interceptors } from "./Interceptors";

let movie_client_api: AxiosInstance;
let cep_client_api: AxiosInstance;
let restClient: AxiosInstance;

export const setupClient = ({
  movieApiUrl,
  cepApiUrl,
  backUrl,
}: IAxiosClient) => {
  movie_client_api = axios.create({
    baseURL: movieApiUrl,
  });

  cep_client_api = axios.create({ baseURL: cepApiUrl });

  restClient = axios.create({
    baseURL: backUrl,
    validateStatus(status) {
      return status < 500;
    },
  });

  restClient.interceptors.request.use(
    interceptors.handleRequest,
    interceptors.handleError
  );

  restClient.interceptors.response.use(
    interceptors.handleResponse,
    interceptors.handleError
  );
};

export const setBearerAuthorization = (
  client: AxiosInstance,
  token: string
) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setBasicAuthorization = (
  client: AxiosInstance,
  encode: string
) => {
  client.defaults.headers.common["Authorization"] = `Basic ${encode}`;
};

export const movieClient = () => movie_client_api;
export const zipCodeClient = () => cep_client_api;
export const backClient = () => restClient;
