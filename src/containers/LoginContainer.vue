<template>
  <Loading :showLoading="showLoading" />

  <Container type="login">
    <Wrapper type="logo">
      <Vue3Lottie :animationData="movie" />
    </Wrapper>

    <Login
      :eye-icon="eyeIcon"
      :showButton="showButton"
      :validationError="validationError"
      :errorMessage="errorMessage"
      :inputType="inputType"
      :showPassword="showPassword"
      :validatedUserInfo="validatedUserInfo"
      @login="login"
    />
  </Container>
</template>

<script setup lang="ts">
/* eslint-disable no-useless-escape */
import { Vue3Lottie } from "vue3-lottie";
import movie from "@/assets/movie.json";
import Wrapper from "@/components/atoms/Wrapper.vue";
import Container from "@/components/atoms/Container.vue";
import Login from "@/components/organisms/Login.vue";
import { ref } from "vue";
import { IResponseHandler, IUserInfo } from "@/utils/interfaces";
import Loading from "@/components/molecules/Loading.vue";
import { signin } from "@/api/login";
import { TypeErrors } from "@/utils/enum";
import router from "@/router";

let showLoading = ref(false);
let eyeIcon = ref(false);
let showButton = ref(false);
let validationError = ref(false);
let errorMessage = ref("");
let inputType = ref("password");

const showPassword = (event: Event) => {
  event.stopPropagation();

  eyeIcon.value = !eyeIcon.value;

  if (inputType.value == "password") {
    inputType.value = "text";
  } else {
    inputType.value = "password";
  }
};

const validatedUserInfo = (userInfo: IUserInfo) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email);

  if (regex && userInfo.password != "") {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};

const login = async (userInfo: IUserInfo) => {
  showLoading.value = true;

  const response: any = await signin(userInfo);

  console.log("restttt", response);

  responseHandler(response?.status || response?.response?.status);

  showLoading.value = false;
};

const responseHandler = (response: number) => {
  const handleResponse: IResponseHandler = {
    200: () => router.push("/Painel"),
    404: () => handleError(TypeErrors.INCORRECT_PASSWORD),
    403: () => handleError(TypeErrors.USER_NOT_FOUND),
    500: () => handleError(TypeErrors.UNEXPECTED_ERROR),
  };

  const handler = handleResponse[response as keyof IResponseHandler];

  handler();
};

const handleError = (errorType: string) => {
  validationError.value = true;
  showButton.value = false;
  errorMessage.value = errorType;
};
</script>
