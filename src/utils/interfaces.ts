import { NavigationFailure } from "vue-router";

export interface IAxiosClient {
  movieApiUrl: string | undefined;
  cepApiUrl: string | undefined;
  backUrl: string | undefined;
}

export interface IInputVariant {
  login: string;
  input: string;
}

export interface IContainerVariant {
  login: string;
  loadingContainer: string;
  painelContainer: string;
  menuContainer: string;
  page: string;
  paginationContainer: string;
  itemsPerPageContainer: string;
  backgroundContainer: string;
  card: string;
}

export interface IButtonVariant {
  login: string;
  showPassword: string;
  paginationButton: string;
  submit: string;
  closeButton: string;
  confirmButton: string;
}

export interface IWrapperVariant {
  acessArea: string;
  inputArea: string;
  inputIcon: string;
  iconArea: string;
  logo: string;
  textArea: string;
  modal: string;
  menuIcon: string;
  dataTable: string;
  header: string;
  actionsModal: string;
  notification: string;
  deleteModal: string;
  filter: string;
  card: string;
  backgroundCard: string;
}

export interface IMessage {
  title: string;
  subTitle: string;
}

export interface IUserInfo {
  email: string;
  password: string;
}

export interface IResponseHandler {
  [key: number]: () => Promise<void | NavigationFailure | undefined> | void;
}

export interface IUseProps {
  setTableBackground: (index: number) => any;
  setTotalPages: (page: number) => number[];
  handleAutoCompleteStyle: (value: string | undefined | null) => any;
  inputWrappingStyle: () => IInputWrappingStyle;
  maskZipCode: (zipCode: string) => string;
}

export interface IUsers {
  id: string;
  name: string;
  docNum: string;
  status: string;
  email: string;
  password?: string;
}

export interface IClient {
  id: string;
  name: string;
  surname: string;
  docNum: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  status?: string;
}

export interface ClientForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  docNum: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  [key: string]: string;
}

export interface IViaCepApi {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export interface IAdress {
  data: IViaCepApi;
}

export interface IMovies {
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  id: number;
}

export interface IInputWrappingStyle {
  display: string;
  width: string;
  justifyContent: string;
  marginTop: string;
  position: string;
  flexWrap: string;
  minHeight: string;
}

export type UseForm = Pick<IUsers, "name" | "email" | "docNum" | "password">;
