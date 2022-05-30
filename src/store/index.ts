import { createStore } from 'vuex';
import DogService from '@/services/DogService';
import DogResponseData from '@/types/DogResponseData';
import { IState } from '@/types/IState';
import axios from 'axios';

export default createStore<IState>({
    state: {
        dogs: [],
        breeds: [],
        sort: false,
        currentBreed: -1,
    },
    getters: {
        getDogs(state) {
            return state.dogs;
        },
        getBreeds(state): string[] {
            return state.breeds;
        },
        getSort(state): boolean {
            return state.sort;
        },
        getCurrentBreed(state): number {
            return state.currentBreed;
        },
    },
    mutations: {
        setDogs(state, { dogs }) {
            // https://images.dog.ceo/breeds/finnish-lapphund/mochilamvan.jpg
            for (const dogsKey in dogs) {
                axios
                    .get(dogs[dogsKey], { responseType: 'blob' })
                    .then(function (response) {
                        const reader = new window.FileReader();
                        reader.readAsDataURL(response.data);
                        reader.onload = function () {
                            const base64image = reader.result;
                            if (base64image) {
                                state.dogs.push({
                                    name: dogs[dogsKey].split('/')[4],
                                    url: dogs[dogsKey],
                                    image: base64image.toString(),
                                });
                            }
                        };
                    });
            }
        },
        setBreedsList(state, { breeds }) {
            state.breeds = breeds;
        },
        toEmptyDogs(state) {
            state.dogs = [];
        },
        switchSort(state, { sort }) {
            state.sort = sort;
        },
        nextBreed(state) {
            if (state.currentBreed === -1) {
                state.currentBreed = 0;
            } else {
                ++state.currentBreed;
            }
        },
    },
    actions: {
        getRandomDogs({ commit }) {
            let dogs: string[] = [];
            return DogService.getRandomDogs()
                .then((response: DogResponseData) => {
                    if (response.data.status == 'success') {
                        dogs = response.data.message;
                        commit('setDogs', { dogs });
                    } else {
                        console.error(response);
                    }
                })
                .catch(reason => {
                    console.error(reason);
                });
        },
        getBreedsList({ commit }) {
            return DogService.getBreedsList()
                .then((response: DogResponseData) => {
                    if (response.data.status == 'success') {
                        const breeds = response.data.message;
                        commit('setBreedsList', { breeds });
                    } else {
                        console.error(response);
                    }
                })
                .catch(reason => {
                    console.error(reason);
                });
        },
        switchSort({ commit }, sort: boolean) {
            commit('toEmptyDogs');
            commit('switchSort', { sort });
        },
        nextBreed({ commit }) {
            commit('nextBreed');
        },
        getRandomDogsByCurrentBreed({ state, commit }) {
            let dogs: string[] = [];
            const breed: string = state.breeds[state.currentBreed];
            return DogService.getRandomDogsByBreed(breed)
                .then((response: DogResponseData) => {
                    if (response.data.status == 'success') {
                        dogs = response.data.message;
                        commit('setDogs', { dogs });
                        commit('nextBreed');
                    } else {
                        console.error(response);
                    }
                })
                .catch(reason => {
                    console.error(reason);
                });
        },
    },
    modules: {},
});
