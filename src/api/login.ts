import {
  setBearerAuthorization,
  backClient,
  setBasicAuthorization,
} from "@/clients/AxiosClient";
import { Routes } from "@/utils/enum";
import { IUserInfo } from "@/utils/interfaces";
import { setIsAuthenticated, setPermission } from "@/utils/permissions";

export const signin = async (user: IUserInfo) => {
  try {
    const encode = btoa(`${user.email}:${user.password}`);

    setBasicAuthorization(backClient(), encode);

    const res = await backClient().post(Routes.LOGIN);

    const token = res.data.token;

    setBearerAuthorization(backClient(), token);

    const roles = res.data.permission;

    setIsAuthenticated(token);

    setPermission(roles);

    return res;
  } catch (error) {
    return error;
  }
};
