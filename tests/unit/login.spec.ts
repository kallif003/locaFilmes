//tests/unit/Home.spec.js

import { mount } from "@vue/test-utils";
import LoginContainer from "@/containers/LoginContainer.vue";

describe("Test LoginContainer", () => {
  const wrapper = mount(LoginContainer);
  const login = wrapper.findComponent({ name: "Login" });

  it("testing login component and its props ", () => {
    expect(login.exists()).toBe(true);

    expect(login.props("eyeIcon")).toBe(false);
    expect(login.props("showButton")).toEqual(false);
    expect(login.props("validationError")).toBe(false);
    expect(login.props("errorMessage")).toBe("");

    expect(typeof login.props("showPassword")).toBe("function");
    expect(typeof login.props("validatedUserInfo")).toBe("function");
  });

  it("validating that loading is active", () => {
    const loading = wrapper.findComponent({ name: "Loading" });

    const activate_loading = mount(loading, {
      props: {
        showloading: true,
      },
    });

    expect(activate_loading.exists()).toBe(true);
  });

  it("testing the show password function", async () => {
    const button = login.find("#showPassword");

    await button.trigger("click");

    const updatedPasswordInput = login.find("#pass");

    expect(updatedPasswordInput.attributes("type")).toBe("text");

    await button.trigger("click");

    expect(updatedPasswordInput.attributes("type")).toBe("password");
  });

  it("testing value input", async () => {
    const emailInput = login.find("#email");
    const passwordInput = login.find("#pass");

    emailInput.setValue("k@k.com");
    passwordInput.setValue("1234");

    const emailValue = (emailInput.element as any).value;
    const passwordValue = (passwordInput.element as any).value;

    expect(emailValue).toBe("k@k.com");
    expect(passwordValue).toBe("1234");
  });

  it("validates email and password inputs", async () => {
    const emailInput = login.find('input[type="email"]');

    expect(emailInput.exists()).toBe(true);
    expect(emailInput.attributes("type")).toBe("email");

    const passwordInput = login.find('input[type="password"]');

    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput.attributes("type")).toBe("password");
  });
});
