<template>
  <Container type="page">
    <Loading v-if="showLoading" />

    <Notification
      :title="title"
      :subTitle="subTitle"
      @closeModal="closeNotificationModal"
      v-if="showNotificationModal"
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

    <Wrapper type="header">
      <Wrapper type="filter" class="!w-[30%]">
        <MovieFilter :getMovieByName="getMovieByName" :movie="movieName" />

        <button @click="movieFilterCleaning" v-if="movieSelected">
          Limpar<v-icon icon="mdi-close" />
        </button>
      </Wrapper>

      <Button btnType="submit" class="bg-white mt-10">
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
//import LocationFilter from "@/components/molecules/LocationFilter.vue";
import { useHead } from "@unhead/vue";
import MovieFilter from "@/components/molecules/MovieFilter.vue";
import { ref } from "vue";
import { IMessage, IMovies } from "@/utils/interfaces";
import { onMounted } from "vue";
import {
  createLocationApi,
  getAllMovies,
  getMoviesByNameApi,
  validateRentalPermissionApi,
} from "@/api/movies";
import useProps from "@/context/useProps";

useHead({
  title: "Aloca Filmes - Locações",
});

const { setTotalPages, maskZipCode } = useProps();

let showLoading = ref(false);
let showNotificationModal = ref(false);
//let allDocNum = ref<string[]>([]);
let docNum = ref("");
//let clientName = ref<string[]>([]);
let showLocationModal = ref(false);
let typeAction = ref("Alugar");
//let clientSelected = ref(false);
let client = ref({ name: "", phone: "" });
let page = ref(1);
let totalPages = ref<number[]>([5, 0]);
let movies = ref<IMovies[]>([]);
let showButton = ref(false);
//let movieId = ref(-1);
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

const createLocation = async () => {
  showLoading.value = true;

  const res: any = await createLocationApi(
    docNum.value,
    client.value.name,
    movieInfo.value.title
  );

  if (res?.status == 201) {
    handleApiResponse(res?.data.message);
  }

  changeVariableState();
};

const movieFilterCleaning = () => {
  movieName.value = "";
  movieSelected.value = false;

  getMovies(page.value);
};

const setPagination = async (currentPage: number) => {
  if (page.value != currentPage) {
    page.value = currentPage;

    getMovies(currentPage);
  }
};

const selectStatus = async (status: string) => {
  if (status != "") {
    console.log("ok");
  }
};

const selectDocNum = async (docNum: string) => {
  if (docNum != "") {
    console.log("ok");
  }
};

const selectClient = async (name: string) => {
  if (name != "") {
    console.log("ok");
  }
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

  movies.value = parserMovies(AllMovies.data.results);

  showLoading.value = false;
};

onMounted(async () => {
  totalPages.value = setTotalPages(500);

  getMovies(page.value);
});
</script>
