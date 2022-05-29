import { createStore } from 'vuex';
import DogService from '@/services/DogService';
import DogResponseData from '@/types/DogResponseData';
import { IState } from '@/types/IState';
import axios from 'axios';

export default createStore<IState>({
    state: {
        dogsBlobs: [],
    },
    getters: {
        getDogs(state) {
            return state.dogsBlobs;
        },
    },
    mutations: {
        setRandomDogs(state, { dogs }) {
            let dogsUrls: string[] = [];
            dogsUrls = dogsUrls.concat(dogs);

            for (const dogsKey in dogs) {
                axios
                    .get(dogs[dogsKey], { responseType: 'blob' })
                    .then(function (response) {
                        const reader = new window.FileReader();
                        reader.readAsDataURL(response.data);
                        reader.onload = function () {
                            const base64image = reader.result;
                            if (base64image) {
                                state.dogsBlobs.push({
                                    url: dogs[dogsKey],
                                    image: base64image.toString(),
                                });
                            }
                        };
                    });
            }
        },
        toEmptyDogs(state) {
            state.dogsBlobs = [];
        },
    },
    actions: {
        getRandomDogs({ commit }, sort: boolean) {
            let dogs: string[] = [];
            DogService.getRandomDogs()
                .then((response: DogResponseData) => {
                    if (response.data.status == 'success') {
                        dogs = response.data.message;
                        commit('setRandomDogs', { dogs, sort });
                    } else {
                        console.error(response);
                    }
                })
                .catch(reason => {
                    console.error(reason);
                });
        },
        toEmptyDogs({ commit }) {
            commit('toEmptyDogs');
        },
    },
    modules: {},
});
