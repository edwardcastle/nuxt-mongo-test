<script setup lang="ts">
import { useGatewayStore } from '~/store/gateways';
import { ComputedRef, Ref } from 'vue';
import { GatewayType } from '~/types';
import moment from 'moment';
import { ipv4Regex } from '@/helpers/regex'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const gatewayStore = useGatewayStore();
const router = useRouter();
const route = useRoute();

// variables
const gateway: Ref<GatewayType> = ref({
  serialNumber: '',
  name: '',
  ipv4: '',
  peripheralDevices: [],
});

// Computed properties
const isEditing: ComputedRef<boolean> = computed(
  () => route.name === 'gateways-id',
);
const loading: ComputedRef<boolean> = computed(() => gatewayStore.loading);
const isGatewayIncomplete: ComputedRef<boolean> = computed(() =>
  Object.values(gateway.value).some((value) => value === ''),
);
const isDeviceIncomplete: ComputedRef<boolean> = computed(() =>
  gateway.value.peripheralDevices.every(item => !item.uid || !item.vendor)
  && gateway.value.peripheralDevices.length > 0)

// methods
/**
 * Add a new device to the gateway
 * @return null
 **/
const addDevice = () =>
  gateway.value.peripheralDevices.push({
    uid: null,
    vendor: null,
    status: false,
    createdDate: moment().format('YYYY-MM-DD'),
  });


/**
 * Delete a device from gateway
 * @param {number} index
 * @return void
 **/
const deleteDevice = (index: number) =>
  gateway.value.peripheralDevices.splice(index, 1);

/**
 * Clear form and go back to main page
 * @return void
 **/
const cancelAction = async () => {
  await clearForm();
  await router.push('/');
};

const isIpv4Valid =  computed(() => ipv4Regex.test(gateway.value.ipv4))

  /**
 * Create/Update a gateway if inputs are valids
 * @return void
 **/
const manageOperation = async () => {
    if (isGatewayIncomplete.value || isDeviceIncomplete.value)
      $toast.error('Inputs should be no empty')
    else if (!isIpv4Valid.value)
      $toast.error('The Ipv4 you entered is invalid !!')
    else {
      if (isEditing.value) {
        await gatewayStore.update(<string>route.params.id, gateway.value);
      } else {
        await gatewayStore.create(gateway.value);
        clearForm();
      }
    }
  }

/**
 * Clear form
 * @return void
 **/
const clearForm = () => {
  gateway.value = {
    serialNumber: '',
    name: '',
    ipv4: '',
    peripheralDevices: [],
  };
};

/**
 * Avoid to input text on UID input
 * @return void
 **/
const acceptOnlyNumber = ($event) => {
  if($event.key !== 'Backspace')
  if (!/\d/.test($event.key)) return $event.preventDefault();
};

/**
 * Check if user is going to edit
 * @return void
 **/
onMounted(async () => {
  if (isEditing.value) {
    await gatewayStore.get(<string>route.params.id);
    gateway.value = gatewayStore.currentGateway;
  }
});
</script>

<template>
  <section>
    <div v-if="!loading">
      <div>
        <nuxt-link to="/">
          <p class="cursor-pointer hover:text-blue-600 underline">
            {{ `<- Go Back` }}
          </p>
        </nuxt-link>
        <h1 class="text-center text-2xl md:text-4xl 3xl:text-5xl mt-5">
          {{ isEditing ? 'View/Edit Gateway' : 'Add a new Gateway' }}
        </h1>
      </div>

      <div class="max-w-3xl flex mx-auto">
        <div class="mt-16 w-full space-y-7">
          <!-- Serial Number -->
          <div>
            <label>Serial Number</label>
            <input
              v-model="gateway.serialNumber"
              type="text"
            />
          </div>

          <!-- Name -->
          <div>
            <label>Name</label>
            <input
              v-model="gateway.name"
              type="text"
            />
          </div>

          <!-- ipv4 -->
          <div>
            <label>ipv4</label>
            <input
              v-model="gateway.ipv4"
              type="text"
            />
          </div>

          <div
            v-for="(device, index) in gateway.peripheralDevices"
            :key="index"
            class="border-[1px] p-8"
          >
            <div class="flex justify-between mb-5">
              <h1>{{ `Peripheral Device ${index + 1}` }}</h1>
              <button
                class="danger"
                @click="deleteDevice(index)"
              >
                Delete
              </button>
            </div>

            <div class="space-y-7">
              <!-- UID -->
              <div>
                <label>UID</label>
                <input
                  v-model="gateway.peripheralDevices[index].uid"
                  @keydown="acceptOnlyNumber"
                  type="number"
                  min="0"
                />
              </div>

              <!-- Vendor -->
              <div>
                <label>vendor</label>
                <input
                  v-model="gateway.peripheralDevices[index].vendor"
                  type="text"
                />
              </div>

              <!-- status online/offline -->
              <div class="flex ml-2">
                <input
                  v-model="gateway.peripheralDevices[index].status"
                  type="checkbox"
                />
                <label>Online</label>
              </div>

              <!-- Created Date -->
              <div>
                <label>Created Date</label>
                <input
                  v-model="gateway.peripheralDevices[index].createdDate"
                  type="date"
                />
              </div>
            </div>
          </div>

          <!-- Add peripheral Device button -->
          <div class="text-end">
            <button
              :disabled="gateway.peripheralDevices.length === 10"
              @click="addDevice()"
            >
              Add device
            </button>
          </div>

          <!-- Add Gateway -->
          <hr />
          <div class="block sm:flex justify-center md:mx-32">
            <div class="w-full sm:w-1/2">
              <button
                class="w-full"
                @click="manageOperation()"
              >
                {{ isEditing ? 'Update Gateway' : 'Create Gateway' }}
              </button>
            </div>

            <!-- Cancel button -->
            <div class="w-full sm:w-1/2 mt-5 sm:mt-0">
              <button
                class="w-full danger sm:ml-4"
                @click="cancelAction()"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-screen flex my-auto"
      v-else
    >
      <LoadingSpinner />
    </div>
  </section>
</template>