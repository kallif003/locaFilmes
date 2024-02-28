import SecureLS from "secure-ls";

const ls = new SecureLS({
  encodingType: "aes",
  encryptionSecret: process.env.VUE_APP_SECRET_KEY,
});

export const setIsAuthenticated = (token: string) => {
  ls.set("token", JSON.stringify(token));
};

export const isAuthenticated = (): string => {
  return JSON.parse(ls.get("token") || "[]");
};

export const removeItems = () => {
  ls.removeAll();
};

export const setPermission = (permissions: Array<string>) => {
  return ls.set("user_permissions", JSON.stringify(permissions));
};
