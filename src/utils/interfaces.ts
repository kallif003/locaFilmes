import { NavigationFailure } from "vue-router";

export interface IAxiosClient {
  movieApiUrl: string | undefined;
  cepApiUrl: string | undefined;
  backUrl: string | undefined;
}

export interface IInputVariant {
  login: string;
}

export interface IContainerVariant {
  login: string;
  loadingContainer: string;
}

export interface IButtonVariant {
  login: string;
  showPassword: string;
}

export interface IWrapperVariant {
  acessArea: string;
  inputArea: string;
  inputIcon: string;
  iconArea: string;
  logo: string;
  textArea: string;
  modal: string;
}

export interface IUserInfo {
  email: string;
  password: string;
}

export interface IResponseHandler {
  [key: number]: () => Promise<void | NavigationFailure | undefined> | void;
}
