/*
 doc: https://dog.ceo/dog-api/
 api: https://dog.ceo/dog-api/api/
*/

import axios from 'axios';
import DogResponseData from '@/types/DogResponseData';

class DogService {
    private dogsLimit = 20;
    private API_URL = 'https://dog.ceo/api';

    public getRandomDogs(): Promise<DogResponseData> {
        return axios.get(
            `${this.API_URL}/breeds/image/random/${this.dogsLimit}`
        );
    }
}

export default new DogService();
