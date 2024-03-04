<template>
  <Container type="page">
    <Loading :showLoading="showLoading" />

    <Notification
      :title="title"
      :subTitle="subTitle"
      @closeModal="closeNotificationModal"
      :showNotificationModal="showNotificationModal"
    />

    <ActionModal
      v-if="showDeleteModal"
      :closeDeleteModal="() => (showDeleteModal = false)"
      :confirm-action="deleteClient"
      title="Confirmar exclusão"
      sub-title="Tem certeza que deseja excluir esse cliente?"
    />

    <WrapperModal
      v-if="showClientModal"
      :closeModalOutside="() => (showClientModal = false)"
    >
      <ClientModal
        :type-action="typeAction"
        :client="client"
        :maskZipCode="maskZipCode"
        :handleClient="handleClient"
        :validateZipCode="validateZipCode"
        :inputWrappingStyle="inputWrappingStyle"
        :createOrUpdateClient="createOrUpdateUser"
      >
        <ModalActionButtons
          :type-action="typeAction"
          :show-button="showButton"
          :closeModal="closeClientModal"
        />
      </ClientModal>
    </WrapperModal>

    <Wrapper type="header">
      <Wrapper type="filter">
        <ClientFilter
          :clients="clientName"
          :docNum="docNum"
          :selectStatus="selectStatus"
          :selectClientByDocNum="selectDocNum"
          :selectClient="selectClient"
        />

        <button @click="clientFilterCleaning" v-if="clientSelected">
          Limpar<v-icon icon="mdi-close" />
        </button>
      </Wrapper>

      <Button
        id="register-client"
        btnType="submit"
        class="bg-white"
        @click="openClientModal(Actions.SAVE, '')"
      >
        <p class="text-v_medium_gray">Cadastrar</p>
      </Button>
    </Wrapper>

    <ClientCard
      :actions="actions"
      :content="clients"
      :itemsPerPage="Number(itemsPerPage)"
      :show-delete-modal="openDeleteModal"
      :openUserModal="openClientModal"
    >
      <EmptyTable :content="clients.length" />
    </ClientCard>

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
import ClientFilter from "@/components/molecules/ClientFilter.vue";
import ClientModal from "@/components/organisms/ClientModal.vue";
import ClientCard from "@/components/organisms/ClientCard.vue";
import ActionModal from "@/components/molecules/ActionModal.vue";
import Notification from "@/components/molecules/NotificationModal.vue";
import ModalActionButtons from "@/components/molecules/ModalActionButtons.vue";
import WrapperModal from "@/components/molecules/WrapperModal.vue";
import WrapperPagination from "@/components/molecules/WrapperPagination.vue";
import Wrapper from "@/components/atoms/Wrapper.vue";
import Button from "@/components/atoms/Button.vue";
import Pagination from "@/components/organisms/Pagination.vue";
import ItemsPerPage from "@/components/molecules/ItemsPerPage.vue";
import Container from "@/components/atoms/Container.vue";
import Loading from "@/components/molecules/Loading.vue";
import { useHead } from "@unhead/vue";
import EmptyTable from "@/components/molecules/EmptyTable.vue";
import { Actions } from "@/utils/enum";
import { onMounted, ref, watch } from "vue";
import { ClientForm, IClient, IMessage, IViaCepApi } from "@/utils/interfaces";
import useProps from "@/context/useProps";
import {
  createClientApi,
  deleteClientApi,
  getAllClientNamesApi,
  getAllClientsApi,
  getAllDocNumbersApi,
  getClientByNameOrDocNumOrStatusApi,
  updateClientApi,
} from "@/api/customer";
import { getAdress } from "@/api/viacep";

useHead({
  title: "Aloca Filmes - Clientes",
});

const { inputWrappingStyle, setTotalPages, maskZipCode } = useProps();

const actions = ["Atualizar", "Deletar"];

let showLoading = ref(false);
let showDeleteModal = ref(false);
let showNotificationModal = ref(false);
let itemsPerPage = ref(10);
let showClientModal = ref(false);
let typeAction = ref("Cadastrar");
let page = ref(1);
let totalPages = ref<number[]>([]);
let showButton = ref(false);
let title = ref("");
let subTitle = ref("");
let clientId = ref("");
let clientSelected = ref(false);
let clients = ref<IClient[]>([]);
let docNum = ref<string[]>([]);
let clientName = ref<string[]>([]);
let zipCode = ref("");

let client = ref<ClientForm>({
  name: "",
  surname: "",
  email: "",
  phone: "",
  docNum: "",
  cep: "",
  street: "",
  district: "",
  city: "",
  state: "",
});

watch(client.value, () => {
  if (typeAction.value == Actions.SAVE) {
    validateDataToCreateClient(client.value);
  } else {
    validateDataToUpdateClient(client.value);
  }
});

const setPagination = (currentPage: number) => {
  if (page.value != currentPage) {
    page.value = currentPage;

    getAllClients(page.value, itemsPerPage.value);
  }
};

const setItemsPerPage = (value: number) => {
  if (itemsPerPage.value != value) {
    itemsPerPage.value = value;

    getAllClients(page.value, itemsPerPage.value);
  }
};

const handleClient = (value: string, key: string) => {
  client.value[key] = value;

  if (typeAction.value == Actions.SAVE) {
    validateDataToCreateClient(client.value);
  } else {
    validateDataToUpdateClient(client.value);
  }
};

const closeNotificationModal = () => {
  showNotificationModal.value = false;
};

const openClientModal = (action: string, id: string) => {
  showClientModal.value = true;
  typeAction.value = action;
  clientId.value = id;

  client.value = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    docNum: "",
    cep: "",
    street: "",
    district: "",
    city: "",
    state: "",
  };
};

const openDeleteModal = (id: string) => {
  clientId.value = id;
  showDeleteModal.value = true;
};

const closeClientModal = (event: Event) => {
  event.stopPropagation();
  showClientModal.value = false;
};

const clientFilterCleaning = async () => {
  if (clientSelected.value) {
    getAllClients(page.value, itemsPerPage.value);

    clientSelected.value = false;
  }
};

const handleApiResponse = (message: IMessage) => {
  title.value = message.title;
  subTitle.value = message.subTitle;
};

const changeVariableState = () => {
  showNotificationModal.value = true;
  showClientModal.value = false;
  showButton.value = false;
  showLoading.value = false;
};

const validateDataToCreateClient = (clientForm: ClientForm) => {
  let validate = [];

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(clientForm.email!);

  for (const key in clientForm) {
    if (clientForm[key as keyof ClientForm] != "" && regex) {
      validate.push(key);
    }
  }

  if (validate.length == 10) {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};

const validateDataToUpdateClient = (clientForm: ClientForm) => {
  let validate = [];
  let regex = true;

  for (const key in clientForm) {
    if (clientForm[key as keyof ClientForm] != "") {
      validate.push(key);
    }
  }

  if (clientForm.email != "") {
    regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(clientForm.email!);
  }

  if (validate.length > 0 && regex) showButton.value = true;
  else if (!regex) showButton.value = false;
  else showButton.value = false;
};

const createOrUpdateUser = (clientForm: ClientForm, action: string) => {
  showLoading.value = true;

  if (action == Actions.SAVE) {
    createClient(clientForm);
  } else {
    updateClient(clientForm);
  }
};

const createClient = async (clientForm: ClientForm) => {
  showLoading.value = true;

  const res: any = await createClientApi(clientForm);

  if (res?.status == 201) {
    getAllClients(page.value, itemsPerPage.value);

    handleApiResponse(res?.data.message);
  } else {
    handleApiResponse(res?.response.data.message);
  }

  changeVariableState();
};

const updateClient = async (clientForm: ClientForm) => {
  showLoading.value = true;

  const res: any = await updateClientApi(clientForm, clientId.value);

  if (res?.status == 200) {
    getAllClients(page.value, itemsPerPage.value);

    handleApiResponse(res?.data.message);
  } else {
    handleApiResponse(res?.response.data.message);
  }

  changeVariableState();
};

const deleteClient = async () => {
  showLoading.value = true;

  showDeleteModal.value = false;

  const res: any = await deleteClientApi(clientId.value);

  if (res?.status == 200) {
    getAllClients(page.value, itemsPerPage.value);

    handleApiResponse(res?.data.message);
  } else {
    handleApiResponse(res?.response.data.message);
  }

  changeVariableState();
};

const getAllClients = async (currentPage: number, itemsPerPage: number) => {
  showLoading.value = true;

  const res: any = await getAllClientsApi(currentPage, itemsPerPage);

  if (res?.status == 200) {
    clients.value = parserClient(res.data.customer);

    totalPages.value = setTotalPages(res.data.totalPages);
  } else if (res?.status == 404) {
    clients.value = [];

    totalPages.value = [];
  } else {
    handleApiResponse(res?.response?.data?.message);

    showNotificationModal.value = true;
  }

  showLoading.value = false;
};

const parserClient = (data: any[]) => {
  const clients = data.map((client) => ({
    id: client._id,
    name: client.name,
    email: client.email,
    docNum: client.docNum,
    phone: client.phone,
    surname: client.surname,
    cep: client.cep,
    street: client.street,
    district: client.district,
    city: client.city,
    state: client.state,
    status: client.deleted ? "Inativo" : "Ativo",
  }));

  return clients;
};

const selectStatus = async (status: string) => {
  if (status != "") {
    clients.value = [];

    const res: any = await getClientByNameOrDocNumOrStatusApi(
      null,
      null,
      status
    );

    if (res?.status == 200) {
      clients.value = parserClient(res?.data);
    }

    clientSelected.value = true;
  }
};

const selectDocNum = async (docNum: string) => {
  if (docNum != "") {
    clients.value = [];

    const res: any = await getClientByNameOrDocNumOrStatusApi(
      null,
      docNum,
      null
    );

    if (res?.status == 200) {
      clients.value = parserClient(res?.data);
    }

    clientSelected.value = true;
  }
};

const selectClient = async (name: string) => {
  if (name != "") {
    clients.value = [];

    const res: any = await getClientByNameOrDocNumOrStatusApi(name, null, null);

    if (res?.status == 200) {
      clients.value = parserClient(res?.data);
    }

    clientSelected.value = true;
  }
};

const getAllClientNames = async () => {
  const res: any = await getAllClientNamesApi();

  if (res?.status == 200) {
    clientName.value = res?.data;
  }
};

const getAllDocNumbers = async () => {
  const res: any = await getAllDocNumbersApi();

  if (res?.status == 200) {
    docNum.value = res?.data;
  }
};

const validateZipCode = async (value: string) => {
  zipCode.value = value.replace(/\D/g, "");

  zipCode.value = value.replace(/^(\d{5})(\d)/, "$1-$2");

  if (/^\d{5}-?\d{3}$/.test(value)) {
    const adress = await getAdress(value);

    //client.value.street = "";
    client.value.district = "";
    client.value.city = "";
    client.value.state = "";

    parseAdress(adress);
  }
};

const parseAdress = (addressData: IViaCepApi) => {
  client.value.cep = addressData.cep;
  client.value.street = addressData.logradouro;
  client.value.district = addressData.bairro;
  client.value.city = addressData.localidade;
  client.value.state = addressData.uf;
};

onMounted(async () => {
  await getAllClients(page.value, itemsPerPage.value);

  await Promise.all([
    getAllClientNames(),
    getAllDocNumbers(),
    getAllClients(page.value, itemsPerPage.value),
  ]);
});
</script>
