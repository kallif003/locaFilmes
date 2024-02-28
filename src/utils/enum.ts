export enum Routes {
  LOGIN = "/api/login",
  SAVE_USER = "/api/user/save",
  GET_ALL_USERS = "/api/getAllUsers",
  UPDATE_USER = "/api/user/update/",
  DELETE_USER = "/api/user/",
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
