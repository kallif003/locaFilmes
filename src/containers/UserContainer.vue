<template>
  <Container type="page">
    <Loading :showLoading="showLoading" />

    <Notification
      :title="title"
      :subTitle="subTitle"
      :showNotificationModal="showNotificationModal"
      @closeModal="closeNotificationModal"
    />

    <ActionModal
      v-if="showDeleteModal"
      :closeDeleteModal="() => (showDeleteModal = false)"
      :confirm-action="deleteUsers"
      title="Confirmar exclusão"
      sub-title="Tem certeza que deseja excluir esse usuário?"
    />

    <WrapperModal
      v-if="showUserModal"
      :closeModalOutside="() => (showUserModal = false)"
    >
      <UserModal
        :type-action="typeAction"
        :inputWrappingStyle="inputWrappingStyle"
        :createOrUpdateUser="createOrUpdateUser"
        :validateDataToCreateUser="validateDataToCreateUser"
        :validateDataToUpdateUser="validateDataToUpdateUser"
      >
        <ModalActionButtons
          :type-action="typeAction"
          :show-button="showButton"
          :closeModal="closeUserModal"
        />
      </UserModal>
    </WrapperModal>

    <Wrapper type="header">
      <Wrapper type="filter">
        <UserFilter
          :users="usernames"
          :docNum="docNum"
          :selectUserByDocNum="selectUserByDocNum"
          :selectUser="selectUser"
          :userFilterCleaning="userFilterCleaning"
        />

        <button @click="userFilterCleaning" v-if="userSelected" class="mt-2">
          Limpar<v-icon icon="mdi-close" />
        </button>
      </Wrapper>

      <Button
        id="register"
        btnType="submit"
        class="bg-white"
        @click="openUserModal(Actions.SAVE, '')"
      >
        <p class="text-v_medium_gray">Cadastrar</p>
      </Button>
    </Wrapper>

    <UserTable
      :actions="actions"
      :content="users"
      :itemsPerPage="Number(itemsPerPage)"
      :show-delete-modal="openDeleteModal"
      :openUserModal="openUserModal"
    >
      <template v-slot:emptyTable>
        <EmptyTable :content="users.length" />
      </template>

      <template v-slot:header>
        <TableHead :headers="headers" action="Ajustar" />
      </template>
    </UserTable>

    <WrapperPagination :totalPages="totalPages" :itemsPerPage="itemsPerPage">
      <ItemsPerPage @setItemsPerPage="setItemsPerPage" class="float-left" />

      <Pagination
        :current-page="page"
        :pageCount="totalPages.length"
        :items="totalPages"
        @paginate="setPagination"
        class="float-right"
      />
    </WrapperPagination>
  </Container>
</template>

<script setup lang="ts">
/* eslint-disable no-useless-escape */
import ActionModal from "@/components/molecules/ActionModal.vue";
import Notification from "@/components/molecules/NotificationModal.vue";
import ModalActionButtons from "@/components/molecules/ModalActionButtons.vue";
import UserModal from "@/components/organisms/UserModal.vue";
import WrapperModal from "@/components/molecules/WrapperModal.vue";
import WrapperPagination from "@/components/molecules/WrapperPagination.vue";
import Wrapper from "@/components/atoms/Wrapper.vue";
import Button from "@/components/atoms/Button.vue";
import UserFilter from "@/components/molecules/UserFilter.vue";
import Pagination from "@/components/organisms/Pagination.vue";
import ItemsPerPage from "@/components/molecules/ItemsPerPage.vue";
import Container from "@/components/atoms/Container.vue";
import Loading from "@/components/molecules/Loading.vue";
import { useHead } from "@unhead/vue";
import UserTable from "@/components/organisms/UserTable.vue";
import TableHead from "@/components/molecules/TableHead.vue";
import EmptyTable from "@/components/molecules/EmptyTable.vue";
import { onMounted, ref } from "vue";
import { IMessage, IUsers, UseForm } from "@/utils/interfaces";
import { Actions, AuthorizationUser } from "@/utils/enum";
import { hasPermission, getPermission } from "@/utils/permissions";
import {
  createUserApi,
  deleteUserApi,
  getAllUsersApi,
  getUsersByNameOrDocNumApi,
  gettAllDocNumbersApi,
  gettAllNamesApi,
  updateUserApi,
} from "@/api/user";
import useProps from "@/context/useProps";

useHead({
  title: "Aloca Filmes - Usuários",
});

const headers = ["Id", "Nome", "Email", "Documento", "Status"];

const actions = ["Atualizar", "Deletar"];

const { setTotalPages, inputWrappingStyle } = useProps();

let showLoading = ref(false);
let showDeleteModal = ref(false);
let showNotificationModal = ref(false);
let users = ref<IUsers[]>([]);
let itemsPerPage = ref(10);
let showUserModal = ref(false);
let typeAction = ref("Cadastrar");
let userId = ref<string>("");
let page = ref(1);
let totalPages = ref<number[]>([]);
let showButton = ref(false);
let permission = ref<string[]>([]);
let title = ref("");
let subTitle = ref("");
let usernames = ref<string[]>([]);
let docNum = ref<string[]>([]);
let userSelected = ref(false);

const openUserModal = (action: string, id: string) => {
  showUserModal.value = true;
  typeAction.value = action;
  userId.value = id;
};

const openDeleteModal = (id: string) => {
  userId.value = id;
  showDeleteModal.value = true;
};

const closeUserModal = (event: Event) => {
  event.stopPropagation();
  showUserModal.value = false;
};

const closeNotificationModal = () => {
  showNotificationModal.value = false;
};

const userFilterCleaning = async () => {
  if (userSelected.value) {
    users.value = [];

    getAllUsers(page.value, itemsPerPage.value);

    userSelected.value = false;
  }
};

const setPagination = (currentPage: number) => {
  if (page.value != currentPage) {
    page.value = currentPage;

    getAllUsers(currentPage, itemsPerPage.value);
  }
};

const setItemsPerPage = (value: number) => {
  if (itemsPerPage.value != value) {
    itemsPerPage.value = value;

    getAllUsers(page.value, value);
  }
};

const handleApiResponse = (message: IMessage) => {
  title.value = message.title;
  subTitle.value = message.subTitle;
};

const changeVariableState = () => {
  showNotificationModal.value = true;
  showUserModal.value = false;
  showButton.value = false;
  showLoading.value = false;
};

const validateDataToCreateUser = (userForm: UseForm) => {
  let validate = [];

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userForm.email!);

  for (const key in userForm) {
    if (userForm[key as keyof UseForm] != "" && regex) {
      validate.push(key);
    }
  }

  if (validate.length == 4 && hasPermission([AuthorizationUser.ADMIN])) {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};

const validateDataToUpdateUser = (user: UseForm) => {
  let validate = [];
  let regex = true;

  for (const key in user) {
    if (user[key as keyof UseForm] != "" && user[key as keyof UseForm]) {
      validate.push(key);
    }
  }

  if (user.email != "") {
    regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email!);
  }

  if (validate.length > 0 && regex) showButton.value = true;
  else if (!regex) showButton.value = false;
  else showButton.value = false;
};

const createOrUpdateUser = (user: UseForm, action: string) => {
  showLoading.value = true;

  if (action == Actions.SAVE) {
    createUsers(user);
  } else {
    updateUsers(user);
  }
};

const createUsers = async (user: UseForm) => {
  showLoading.value = true;

  const res: any = await createUserApi(user, permission.value);

  if (res?.status == 201) {
    getAllUsers(page.value, itemsPerPage.value);

    handleApiResponse(res?.data.message);
  } else {
    handleApiResponse(res?.response.data.message);
  }

  changeVariableState();
};

const updateUsers = async (user: UseForm) => {
  showLoading.value = true;

  const res: any = await updateUserApi(user, userId.value);

  if (res?.status == 200) {
    getAllUsers(page.value, itemsPerPage.value);

    handleApiResponse(res?.data.message);
  } else {
    handleApiResponse(res?.response.data.message);
  }

  changeVariableState();
};

const deleteUsers = async () => {
  showLoading.value = true;

  showDeleteModal.value = false;

  const res: any = await deleteUserApi(userId.value);

  if (res?.status == 200) {
    getAllUsers(page.value, itemsPerPage.value);

    handleApiResponse(res?.data.message);
  } else {
    handleApiResponse(res?.response.data.message);
  }

  changeVariableState();
};

const getAllUsers = async (currentPage: number, itemsPerPage: number) => {
  showLoading.value = true;

  const res: any = await getAllUsersApi(
    currentPage,
    itemsPerPage,
    permission.value
  );

  if (res?.status == 200) {
    users.value = parseUser(res?.data.users);

    totalPages.value = setTotalPages(res?.data.totalPages);
  } else if (res?.status == 404) {
    users.value = [];
    totalPages.value = [];
  }

  showLoading.value = false;
};

const parseUser = (data: any[]) => {
  const users = data.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    status: user.deleted ? "Inativo" : "Ativo",
    docNum: user.docNum,
  }));

  return users;
};

const selectUserByDocNum = async (docNum: string) => {
  if (docNum != "") {
    users.value = [];

    const res: any = await getUsersByNameOrDocNumApi(null, docNum);

    if (res?.status == 200) {
      users.value = parseUser(res?.data);
    }

    userSelected.value = true;
  }
};

const selectUser = async (name: string) => {
  if (name != "") {
    users.value = [];

    const res: any = await getUsersByNameOrDocNumApi(name, null);

    if (res?.status == 200) {
      users.value = parseUser(res?.data);
    }

    userSelected.value = true;
  }
};

const getAllNames = async () => {
  const res: any = await gettAllNamesApi(permission.value);

  if (res?.status == 200) {
    usernames.value = res?.data;
  }
};

const getAllDocNumbers = async () => {
  const res: any = await gettAllDocNumbersApi(permission.value);

  if (res?.status == 200) {
    docNum.value = res?.data;
  }
};

onMounted(async () => {
  permission.value = getPermission();

  await getAllUsers(page.value, itemsPerPage.value);
  await getAllNames();
  await getAllDocNumbers();
});
</script>
