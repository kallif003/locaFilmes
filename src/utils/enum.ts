export enum Routes {
  LOGIN = "/api/login",
  SAVE_USER = "/api/user/save",
  GET_ALL_USERS = "/api/getAllUsers",
  UPDATE_USER = "/api/user/update/",
  DELETE_USER = "/api/user/",
  GET_ALL_NAMES = "/api/get_all_names",
  GET_ALL_DOCNUMBERS = "/api/get_all_docNumbers",
  GET_USER_BY_NAME_OR_DOCNUM = "/api/get_user_by_name_or_docNum",
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
