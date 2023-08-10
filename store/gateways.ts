/**
 * This is the store for managing gateways to database
 * Get all the gateways from the database
 * Create a new gateway
 * Update a gateway
 * Delete a gateway
 * **/
import { defineStore } from 'pinia';
import { ComputedRef, Ref, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { GatewayType } from '~/types';

export const useGatewayStore = defineStore('gateway', () => {
  const $toast = useToast();
  const gateways: Ref<GatewayType[]> = ref([]);
  const currentGateway: Ref<GatewayType> = ref({
    _id: '',
    serialNumber: '',
    name: '',
    ipv4: '',
    peripheralDevices: [],
  });
  const loading: Ref<boolean> = ref(false);
  const isEmpty: ComputedRef<boolean> = computed(
    (): boolean => gateways.value.length === 0,
  );

  /**
   * Get all the gateways
   * @return Promise<void>
   **/
  const getAll = async (): Promise<void> => {
    try {
      loading.value = true;
      gateways.value = await $fetch<GatewayType[]>(`/api/gateways`);
      loading.value = false;
    } catch (e) {
      console.log(e);
      loading.value = false;
    }
  };

  /**
   * Create a new Gateway
   * @param {GatewayType} gateway
   * @return Promise<void>
   **/
  const create = async (gateway: GatewayType): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch(`/api/gateways/create`, {
        method: 'POST',
        body: gateway,
      });
      loading.value = false;
      if (response.message === 'Already exist') {
        $toast.error('Serial number already exist');
      } else {
        $toast.success('Gateway Created !!');
      }
    } catch (e: any) {
      loading.value = false;
      console.log(e);
    }
  };

  /**
   * Get Gateway by id
   * @param {string} id
   * @return Promise<void>
   **/
  const get = async (id: string): Promise<void> => {
    loading.value = true;
    try {
      loading.value = true;
      currentGateway.value = await $fetch<GatewayType>(`/api/gateways/${id}`);
      loading.value = false;
    } catch (e) {
      loading.value = false;
    }
  };

  /**
   * Update a Gateway
   * @param {string} id
   * @param {GatewayType} gateway
   * @return Promise<void>
   **/
  const update = async (id: string, gateway: GatewayType): Promise<void> => {
    try {
      loading.value = true;
      await $fetch(`/api/gateways/${id}`, {
        method: 'PUT',
        body: gateway,
      });
      loading.value = false;
      $toast.success('Gateway Updated !!');
    } catch (e: any) {
      console.log(e);
    }
  };

  /**
   * Delete a Gateway
   * @param {string} id
   * @return Promise<void>
   **/
  const remove = async (id: string): Promise<void> => {
    loading.value = true;
    try {
      await $fetch(`/api/gateways/${id}`, {
        method: 'DELETE',
      });
      loading.value = false;
      await getAll();
      $toast.success('Gateway Deleted !!');
    } catch (e: any) {
      console.log(e);
    }
  };

  return {
    // Variables
    gateways,
    loading,
    isEmpty,
    currentGateway,
    // Functions
    get,
    getAll,
    create,
    update,
    remove,
  };
});
