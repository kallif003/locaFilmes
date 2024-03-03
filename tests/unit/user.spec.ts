import { mount } from "@vue/test-utils";
import UserContainer from "@/containers/UserContainer.vue";

describe("Test UserContainer", () => {
  const wrapper = mount(UserContainer);

  it("validating that loading is active", () => {
    const loading = wrapper.findComponent({ name: "Loading" });

    const activate_loading = mount(loading, {
      props: {
        showloading: true,
      },
    });

    expect(activate_loading.exists()).toBe(true);
  });

  it("validating that notification is disabled", () => {
    const notification = wrapper.findComponent({ name: "Notification" });

    expect(notification.exists()).toBe(false);
  });

  it("validating that action modal is disabled", () => {
    const actionModal = wrapper.findComponent({ name: "ActionModal" });

    expect(actionModal.exists()).toBe(false);
  });

  it("validating that action modal is disabled", () => {
    const wrapperModal = wrapper.findComponent({ name: "WrapperModal" });

    expect(wrapperModal.exists()).toBe(false);
  });
});
