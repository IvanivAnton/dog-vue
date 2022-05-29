<template>
    <div class="home">
        <div>
            <label>
                Sort
                <input
                    type="checkbox"
                    @click="sortHandlerClick"
                    v-model="sort"
                />
            </label>
        </div>
        <DogsList :sort="sort" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import DogsList from '@/components/DogsList.vue';

export default defineComponent({
    components: { DogsList },
    setup() {
        const store = useStore();
        const sort = ref(false);

        function sortHandlerClick() {
            if (sort.value) {
                store.dispatch('toEmptyDogs');
            }
        }

        return {
            sortHandlerClick,
            sort,
        };
    },
});
</script>
