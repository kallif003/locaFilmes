// import { render, fireEvent, screen } from "@testing-library/vue";
// import Login from "@/containers/LoginContainer.vue";
// import { signin } from "@/api/login"; // Se necessário, substitua pelo caminho correto do seu arquivo de API login
// import { TypeErrors } from "@/utils/enum"; // Se necessário, substitua pelo caminho correto do seu arquivo de enums
// import router from "@/router"; // Se necessário, substitua pelo caminho correto do seu arquivo de roteamento

// describe("Login component", () => {
//   test("should toggle eye icon and change password input type", async () => {
//     render(Login);

//     const button = screen.getByTestId("eyeIcon");

//     const passwordInput = screen.getByTestId("password-input");

//     fireEvent.click(button);

//     console.log("p", passwordInput.getAttribute("type"));

//     expect(passwordInput.getAttribute("type")).toBe("text");

//     fireEvent.click(button);

//     expect(passwordInput.getAttribute("type")).toBe("password");
//   });
// });
