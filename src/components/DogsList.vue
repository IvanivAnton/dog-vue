<template>
    <div>
        <label>
            Sort
            <input type="checkbox" @click="sortHandlerClick" v-model="sort" />
        </label>
    </div>
    <div class="wrapper">
        <div v-for="(dogImageBlob, index) in dogs" :key="index">
            <span>{{ dogImageBlob.name }}</span>
            <img class="item" :src="dogImageBlob.image" alt="dog" />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils';
import { ref } from 'vue';

export default defineComponent({
    setup() {
        const store = useStore();
        const sort = ref(store.getters.getSort);

        const dogs = computed(() => {
            return store.getters.getDogs;
        });

        const breeds = computed(() => {
            return store.getters.getBreeds;
        });

        function getMoreDogs() {
            if (sort.value) {
                store.dispatch('getRandomDogsByCurrentBreed');
            } else {
                store.dispatch('getRandomDogs');
            }
        }

        function sortHandlerClick() {
            store.dispatch('switchSort', sort);
            if (!breeds.value || breeds.value.length === 0) {
                const promise = store.dispatch('getBreedsList');
                promise.then(() => {
                    getMoreDogs();
                });
            } else {
                getMoreDogs();
            }
        }

        function scrollHandler() {
            const target = document.body;
            if (target) {
                const offsetYOpposite =
                    target.scrollHeight -
                    window.scrollY -
                    window.screenTop * 2 -
                    window.innerHeight;
                if (offsetYOpposite < 1000) {
                    getMoreDogs();
                }
            }
        }

        onMounted(() => {
            document.addEventListener('scroll', debounce(scrollHandler, 200));
            if (dogs.value.length === 0) {
                getMoreDogs();
            }
        });

        onUnmounted(() => {
            document.removeEventListener(
                'scroll',
                debounce(scrollHandler, 200)
            );
        });

        return {
            dogs,
            sort,
            sortHandlerClick,
        };
    },
});
</script>

<style scoped lang="scss">
.wrapper {
    display: grid;
    margin: 0 auto;
    overflow-y: auto;
    grid-template-columns: 1fr 1fr 1fr;
    .item {
        height: 300px;
        width: 380px;
        overflow: hidden;
    }
}
</style>
