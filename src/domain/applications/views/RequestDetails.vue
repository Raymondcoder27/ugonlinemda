<script setup lang="ts">
import { onMounted, computed, type Ref, ref } from "vue";
import AppModal from "@/components/AppModal.vue";

const showDeleteModal: Ref<boolean> = ref(false);

function rejectRequest() {
  loading.value = true;
  store
    .rejectRequest(selectedDocumentRef.value)
    .then(() => {
      loading.value = false;
      showDeleteModal.value = false;
      requestLogs.value.push({ method: "DELETE", status: "SUCCESS" });
      fetch();
    })
    .catch((error: AxiosError<ApiErrorResponse>) => {
      loading.value = false;
      requestLogs.value.push({ method: "DELETE", status: "FAILURE" });
      notify.error(
        error.response?.data.message || "Error deleting the document"
      );
    });
}
</script>

<template>
  <div class="flex bg-gray-50 min-h-[70vh] overflow-y-auto">
    <div class="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <!-- Breadcrumb -->
      <div class="text-sm mb-4 bg-gray-10 py-2 rounded-sm">
        <router-link
          to="/mda/service-requests"
          class="text-gray-500 hover:text-gray-700 ml-2"
          >Service Requests</router-link
        >
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-700 font-semibold">Request Details</span>
      </div>

      <!-- Details Card -->
      <div class="space-y-4">
        <div class="text-lg font-semibold text-gray-800">Request Details</div>

        <div class="space-y-2">
          <div>
            <span class="block font-medium text-gray-500"
              >Tracking Number:</span
            >
            <span
              class="block text-red-700 font-semibold hover:underline cursor-pointer"
              >123456</span
            >
          </div>
          <div>
            <span class="block font-medium text-gray-500">Service:</span>
            <span class="block text-gray-800">Service Name</span>
          </div>
          <div>
            <span class="block font-medium text-gray-500"
              >Service Description:</span
            >
            <span class="block text-gray-800"
              >Description of the requested service.</span
            >
          </div>
          <div>
            <span class="block font-medium text-gray-500">Applicant Name:</span>
            <span class="block text-gray-800">John Doe</span>
          </div>
          <div>
            <span class="block font-medium text-gray-500">Details Used:</span>
            <span class="block text-gray-800">National ID</span>
          </div>
          <div>
            <span class="block font-medium text-gray-500">Status:</span>
            <span class="block text-gray-800">Pending</span>
          </div>
          <div>
            <span class="block font-medium text-gray-500">Date:</span>
            <span class="block text-gray-800">2024-12-19</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center space-x-4 mt-6">
        <button
          class="px-4 py-1 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition"
        >
          <i class="fa fa-exclamation-circle"></i>
          Query
        </button>
        <button
          @click="showDeleteModal = true"
          class="px-4 py-1 bg-red-700 text-white rounded-md hover:bg-red-600 transition"
        >
          <i class="fa fa-times-square"></i>
          Reject
        </button>
        <button
          class="px-4 py-1 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
        >
          <i class="fa fa-check"></i>
          Approve
        </button>
      </div>
    </div>
  </div>

  <AppModal v-model="showDeleteModal" xl>
    <div class="flex">
      <div class="w-full">
        <div class="flex">
          <span class="mx-auto text-center justify-center">
            <i
              class="mx-auto fa-solid fa-exclamation-circle text-3xl text-danger"
            ></i>
          </span>
        </div>
        <p class="py-5 text-center">
          Are you sure you want to reject this service request?
        </p>
        <div class="flex w-1/2 gap-2 justify-center mx-auto">
          <button
            class="bg-blue-400 hover:bg-blue-500 w-1/2 rounded text-white"
            @click="showDeleteModal = false"
          >
            <i class="fa-solid fa-times-circle mx-1"></i> Cancel
          </button>
          <button
            class="bg-danger text-white p-1 w-1/2 rounded hover:bg-red-800"
            @click="rejectRequest"
          >
            <i class="fa-solid fa-check-circle mx-1"></i> Confirm
          </button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
</style>
