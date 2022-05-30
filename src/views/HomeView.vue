<template>
    <div class="home">
        <DogsList />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DogsList from '@/components/DogsList.vue';

export default defineComponent({
    components: { DogsList },
});
</script>
