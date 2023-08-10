<script setup lang="ts">
import { ComputedRef } from 'vue';
import { useGatewayStore } from '~/store/gateways';
import { GatewayType } from '~/types';

const gatewaysStore = useGatewayStore();
const isEmpty = computed(() => gatewaysStore.isEmpty);

const gateways: ComputedRef<GatewayType[]> = computed(
  () => gatewaysStore.gateways,
);

const deleteGateway = (id) => gatewaysStore.remove(id);
</script>

<template>
  <section v-if="!isEmpty">
    <table class="w-full">
      <th>Serial Number</th>
      <th>Name</th>
      <th>Ipv4</th>
      <th>Peripheral Devices</th>
      <th>Created</th>
      <th>Action</th>
      <tr
        v-for="gateway in gateways"
        :key="gateway._id"
        @click="$router.push(`gateways/${gateway._id}`)"
      >
        <td>{{ gateway.serialNumber }}</td>
        <td>{{ gateway.name }}</td>
        <td>{{ gateway.ipv4 }}</td>
        <td>{{ gateway.peripheralDevices.length }}</td>
        <td>{{ new Date(gateway.createdAt).toLocaleDateString() }}</td>
        <td @click.stop="deleteGateway(gateway._id)">
          <button class="py-0 danger">Delete</button>
        </td>
      </tr>
    </table>
  </section>
  <section v-else>
    <p class="text-xl">There is no gateway created :(</p>
    <p class="text-xl mt-5">Click on 'Add new' button to create it</p>
  </section>
</template>
