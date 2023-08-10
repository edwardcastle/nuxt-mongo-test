<script setup lang="ts">
import { useGatewayStore } from '~/store/gateways';

const gatewaysStore = useGatewayStore();
const loading = computed(() => gatewaysStore.loading);
onMounted(async () => await gatewaysStore.getAll());
</script>

<template>
  <!-- Title -->
  <div class="text-center">
    <h1 class="text-2xl md:text-4xl 3xl:text-5xl mt-5">Gateways</h1>
    <div class="mt-16 h-1/2">
      <div class="grid grid-cols-12">
        <!-- Right button -->
        <div class="col-span-12">
          <div class="md:justify-end justify-center flex">
            <nuxt-link to="gateways/create">
              <button>Add new</button>
            </nuxt-link>
          </div>
        </div>
        <!-- Gateway table -->
        <div class="col-span-12 mt-10">
          <LoadingSpinner v-if="loading" />
          <GatewaysTable v-else />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
