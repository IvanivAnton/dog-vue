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
        <DogsList />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import DogsList from '@/components/DogsList.vue';

export default defineComponent({
    components: { DogsList },
    setup() {
        const store = useStore();
        const sort = false;

        function sortHandlerClick() {
            console.log(sort);
            if (sort) {
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
