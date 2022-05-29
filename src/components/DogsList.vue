<template>
    <div class="wrapper">
        <div v-for="(dogImageBlob, index) in dogs" :key="index">
            <img class="item" :src="dogImageBlob.image" alt="dog" />
        </div>
    </div>
</template>

<script>
import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    // defineProps,
} from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils';

export default defineComponent({
    setup() {
        // const props = defineProps({
        //     sort: Boolean,
        // });

        const store = useStore();

        const dogs = computed(() => {
            return store.getters.getDogs;
        });

        function getMoreDogs() {
            store.dispatch('getRandomDogs', false);
        }

        function scrollHandler() {
            const target = document.body;
            if (target) {
                const offsetYOpposite =
                    target.scrollHeight -
                    window.scrollY -
                    window.screenTop * 2 -
                    window.innerHeight;
                if (offsetYOpposite < 300) {
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
