export enum Routes {
  LOGIN = "/api/login",
  SAVE_USER = "/api/user/save",
  GET_ALL_USERS = "/api/getAllUsers",
  UPDATE_USER = "/api/user/update/",
  DELETE_USER = "/api/user/",
  GET_ALL_NAMES = "/api/get_all_names",
  GET_ALL_DOCNUMBERS = "/api/get_all_docNumbers",
  GET_USER_BY_NAME_OR_DOCNUM = "/api/get_user_by_name_or_docNum",
  SAVE_CUSTOMER = "/api/customer/save",
  GET_ALL_CUSTOMER = "/api/getAllCustomer",
  UPDATE_CUSTOMER = "/api/customer/update/",
  DELETE_CUSTOMER = "/api/customer/",
  GET_ALL_CUSTOMER_NAMES = "/api/get_all_customer_names",
  GET_ALL_CUSTOMER_DOCNUMBERS = "/api/get_all_customer_docNumbers",
  GET_CUSTOMER_BY_NAME_OR_DOCNUM_OR_STATUS = "/api/get_customer_by_name_or_docNum_or_status",
}

export enum TypeErrors {
  INCORRECT_PASSWORD = "Senha incorreta",
  USER_NOT_FOUND = "Usuário não encontrado",
  UNEXPECTED_ERROR = "Tivemos um erro inesperado",
}

export enum AuthorizationUser {
  ADMIN = "ADMIN",
  COLLABORATOR = "COLLABORATOR",
}

export enum Actions {
  SAVE = "Cadastrar",
  UPDATE = "Atualizar",
}
