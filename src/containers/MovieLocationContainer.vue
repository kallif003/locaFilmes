<template>
  <Container type="page">
    <Loading :showLoading="showLoading" />

    <Notification
      :title="title"
      :subTitle="subTitle"
      @closeModal="closeNotificationModal"
      :showNotificationModal="showNotificationModal"
    />

    <WrapperModal
      v-if="showLocationModal"
      :closeModalOutside="() => (showLocationModal = false)"
    >
      <LocationModalVue
        :maskZipCode="maskZipCode"
        :handleClient="handleClient"
        :createLocation="createLocation"
        :docNum="docNum"
        :client="client"
        :errorMessage="errorMessage"
      >
        <ModalActionButtons
          :type-action="typeAction"
          :show-button="showButton"
          :closeModal="closeLocationModal"
        />
      </LocationModalVue>
    </WrapperModal>

    <WrapperModal
      v-if="showListLocationModal"
      :closeModalOutside="() => (showListLocationModal = false)"
    >
      <ListLocationModal :locations="locations" :returnMovie="returnMovie">
        <template v-slot:locationFilter>
          <LocationFilter
            :select-date="selectDate"
            :selectClient="selectClient"
            :selectStatus="selectStatus"
            :clients="clientName"
            :docNum="allDocNum"
          >
            <button @click="movieFilterCleaning" v-if="locationFilterSelected">
              Limpar<v-icon icon="mdi-close" />
            </button>
          </LocationFilter>
        </template>

        <template v-slot:header>
          <TableHead :headers="headers" action="Devolução" />
        </template>

        <template v-slot:pagination>
          <Pagination
            :current-page="page"
            :pageCount="totalLocations.length"
            :items="totalLocations"
            @paginate="setPagination"
            class="ml-5 mt-5"
          />
        </template>
      </ListLocationModal>
    </WrapperModal>

    <Wrapper type="header">
      <Wrapper type="filter" class="!w-[30%]">
        <MovieFilter :getMovieByName="getMovieByName" :movie="movieName" />

        <button @click="movieFilterCleaning" v-if="movieSelected">
          Limpar<v-icon icon="mdi-close" />
        </button>
      </Wrapper>

      <Button
        btnType="submit"
        class="bg-white mt-10"
        @click="() => (showListLocationModal = true)"
      >
        <p class="text-v_medium_gray">Ver Locações</p>
      </Button>
    </Wrapper>

    <MoviesCard :movies="movies" :openLocationModal="openLocationModal" />

    <WrapperPagination :totalPages="totalPages" :itemsPerPage="10">
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
import Wrapper from "@/components/atoms/Wrapper.vue";
import TableHead from "@/components/molecules/TableHead.vue";
import Notification from "@/components/molecules/NotificationModal.vue";
import ModalActionButtons from "@/components/molecules/ModalActionButtons.vue";
import LocationModalVue from "@/components/organisms/LocationModal.vue";
import WrapperModal from "@/components/molecules/WrapperModal.vue";
import Pagination from "@/components/organisms/Pagination.vue";
import WrapperPagination from "@/components/molecules/WrapperPagination.vue";
import Button from "@/components/atoms/Button.vue";
import Container from "@/components/atoms/Container.vue";
import Loading from "@/components/molecules/Loading.vue";
import MoviesCard from "@/components/organisms/MoviesCard.vue";
import ListLocationModal from "@/components/organisms/ListLocationModal.vue";
import LocationFilter from "@/components/molecules/LocationFilter.vue";
import { useHead } from "@unhead/vue";
import MovieFilter from "@/components/molecules/MovieFilter.vue";
import { ref } from "vue";
import { ILocationApi, IMessage, IMovies, ILocation } from "@/utils/interfaces";
import { onMounted } from "vue";
import {
  createLocationApi,
  getAllLocationApi,
  getAllMovies,
  getLocationByFilter,
  getMoviesByNameApi,
  returnMovieApi,
  validateRentalPermissionApi,
} from "@/api/movies";
import useProps from "@/context/useProps";
import { getAllClientNamesApi } from "@/api/customer";

useHead({
  title: "Aloca Filmes - Locações",
});

const headers = ["Cliente", "Filme", "Data locação", "Data entrega", "Status"];

const { setTotalPages, maskZipCode } = useProps();

let showLoading = ref(false);
let showNotificationModal = ref(false);
let showLocationModal = ref(false);
let showListLocationModal = ref(false);
let allDocNum = ref<string[]>([]);
let docNum = ref("");
let clientName = ref<string[]>([]);
let typeAction = ref("Alugar");
let locations = ref<ILocation[]>([]);
let client = ref({ name: "", phone: "" });
let page = ref(1);
let totalPages = ref<number[]>([]);
let totalLocations = ref<number[]>([]);
let movies = ref<IMovies[]>([]);
let showButton = ref(false);
let locationFilterSelected = ref(false);
let movieName = ref("");
let movieSelected = ref(false);
let movieInfo = ref<IMovies>({
  id: 0,
  title: "",
  overview: "",
  poster_path: "",
  release_date: "",
});
let errorMessage = ref("");
let title = ref("");
let subTitle = ref("");

const handleApiResponse = (message: IMessage) => {
  title.value = message.title;
  subTitle.value = message.subTitle;
};

const handleClient = (doc: string) => {
  docNum.value = doc;

  const regex = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/.test(doc);

  if (regex) getUserByDocNum(doc);
};

const closeLocationModal = (event: Event) => {
  event.stopPropagation();
  showLocationModal.value = false;
};

const closeNotificationModal = () => {
  showNotificationModal.value = false;
};

const openLocationModal = (movie: IMovies) => {
  showLocationModal.value = true;

  movieInfo.value = { ...movie };
};

const changeVariableState = () => {
  showNotificationModal.value = true;
  showLocationModal.value = false;
  showButton.value = false;
  showLoading.value = false;
};

const movieFilterCleaning = () => {
  movieName.value = "";
  movieSelected.value = false;
  locationFilterSelected.value = false;

  getMovies(page.value);
  getLocations(page.value);
};

const setPagination = async (currentPage: number) => {
  if (page.value != currentPage) {
    page.value = currentPage;

    getMovies(currentPage);
  }
};

const selectStatus = async (status: string) => {
  if (status != "") {
    const res: any = await getLocationByFilter({
      status,
      customer: null,
      createdAt: null,
    });

    if (res?.status == 200) {
      locations.value = parserLocation(res?.data.locations);
      totalLocations.value = setTotalPages(res?.data.totalPages);

      locationFilterSelected.value = true;
    }
  }
};

const selectClient = async (name: string) => {
  if (name != "") {
    const res: any = await getLocationByFilter({
      status: null,
      customer: name,
      createdAt: null,
    });

    if (res?.status == 200) {
      locations.value = parserLocation(res?.data.locations);
      totalLocations.value = setTotalPages(res?.data.totalPages);

      locationFilterSelected.value = true;
    }
  }
};

const selectDate = async (date: string) => {
  if (date != "") {
    const res: any = await getLocationByFilter({
      status: null,
      customer: null,
      createdAt: date,
    });

    if (res?.status == 200) {
      locations.value = parserLocation(res?.data.locations);
      totalLocations.value = setTotalPages(res?.data.totalPages);

      locationFilterSelected.value = true;
    }
  }
};

const returnMovie = async (id: string) => {
  showLoading.value = true;

  const res: any = await returnMovieApi(id);

  if (res?.status == 200) {
    getLocations(page.value);
  }

  showLoading.value = false;
};

const createLocation = async () => {
  showLoading.value = true;

  const res: any = await createLocationApi(
    docNum.value,
    client.value.name,
    movieInfo.value.title
  );

  if (res?.status == 201) {
    getLocations(page.value);

    handleApiResponse(res?.data.message);
  }

  changeVariableState();
};

const getUserByDocNum = async (docNum: string) => {
  const res: any = await validateRentalPermissionApi(docNum);

  if (res?.status == 200) {
    client.value.name = res.data.name;

    client.value.phone = res.data.phone;

    showButton.value = true;
  } else {
    errorMessage.value = res?.data.message.subTitle;
  }
};

const getMovieByName = async (name: string) => {
  if (name != "") {
    showLoading.value = true;

    movieName.value = name;
    movieSelected.value = true;

    const AllMovies: any = await getMoviesByNameApi(name);

    movies.value = parserMovies(AllMovies.data.results);

    showLoading.value = false;
  }
};

const getMovies = async (currentaPage: number) => {
  showLoading.value = true;

  const AllMovies: any = await getAllMovies(currentaPage);

  showLoading.value = false;

  movies.value = parserMovies(AllMovies?.data?.results);
};

const getLocations = async (currentaPage: number) => {
  const res: any = await getAllLocationApi(currentaPage);

  if (res?.status == 200) {
    locations.value = parserLocation(res?.data.locations);
    totalLocations.value = setTotalPages(res?.data.totalPages);
  }
};

const getAllClientNames = async () => {
  const res: any = await getAllClientNamesApi();

  if (res?.status == 200) {
    clientName.value = res?.data;
  }
};

const parserLocation = (data: ILocationApi[]): ILocation[] => {
  return data.map((location: ILocationApi) => ({
    id: location._id,
    client: location.customer,
    movie: location.movie,
    createdAt: parseDate(location.createdAt),
    date_devolution: location.deletedAt ? parseDate(location.deletedAt) : "",
    status: location.deleted ? "Entregue" : "Locado",
  }));
};

const parseDate = (date: string) => {
  const newDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });

  return formattedDate.format(newDate);
};

const parserMovies = (data: any[]) => {
  return data.map((movies: IMovies) => ({
    title: movies.title,
    overview: movies.overview,
    poster_path: movies.poster_path,
    release_date: movies.release_date,
    id: movies.id,
  }));
};

onMounted(async () => {
  totalPages.value = setTotalPages(500);

  await Promise.all([
    getLocations(page.value),
    getMovies(page.value),
    getAllClientNames(),
  ]);
});
</script>
