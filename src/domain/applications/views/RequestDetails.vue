<script setup lang="ts">
import { ref } from "vue";
import AppModal from "@/components/AppModal.vue";

const showApproveModal = ref(false);
const showRejectModal = ref(false);
const showQueryModal = ref(false);

function queryRequest() {
  loading.value = true;
  store
    .queryRequest(selectedDocumentRef.value)
    .then(() => {
      loading.value = false;
      showQueryModal.value = false;
      requestLogs.value.push({ method: "PUT", status: "SUCCESS" });
      fetch();
    })
    .catch((error) => {
      loading.value = false;
      requestLogs.value.push({ method: "PUT", status: "FAILURE" });
      notify.error(
        error.response?.data.message || "Error querying the document"
      );
    });
}

function rejectRequest() {
  loading.value = true;
  store
    .rejectRequest(selectedDocumentRef.value)
    .then(() => {
      loading.value = false;
      showRejectModal.value = false;
      requestLogs.value.push({ method: "DELETE", status: "SUCCESS" });
      fetch();
    })
    .catch((error) => {
      loading.value = false;
      requestLogs.value.push({ method: "DELETE", status: "FAILURE" });
      notify.error(
        error.response?.data.message || "Error deleting the document"
      );
    });
}
</script>

<template>
  <div class="p-5 bg-white overflow-y-auto relative" style="max-height: 590px;">
    <div class="text-sm mb-4 bg-gray-10 py-2 rounded-sm">
        <router-link
          to="/mda/service-requests"
          class="text-gray-500 hover:text-gray-700 ml-2"
          >Service Requests</router-link
        >
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-700 font-semibold">Request Details</span>
      </div>
    <div class="flex py-2 px-2">
      <!-- Thumbnail and Info -->
      <div class="w-full">
        <div class="flex">
          <div class="w-1/12">
            <!-- <img class="service-thumbnail" src="https://nira.go.ug/assets/exports/nira_logo_black@2x.png" /> -->
            <!-- use the one for ursb -->
            <!-- <img class="service-thumbnail" src="https://ursb.go.ug/assets/images/ug/Logo_Colour-01.jpg" /> -->
             <!-- use the one for posta uganda -->
            <img class="w-[30px]" src="@/assets/images/eposta.png" />
          </div>
          <div class="w-11/12 my-auto">
            <p class="font-bold text-md capitalize">Company Incorporation</p>
            <p class="text-sm capitalize">Posta Uganda</p>
          </div>
        </div>
        <!-- Request Details Card -->
        <div class="flex justify-between bg-green-100 rounded p-2 border border-green-200 mt-4">
          <div class="">
            <p class="text-sm font-bold pt-3">Tracking Number:</p>
            <p class="text-sm">123456</p>
          </div>
          <div class="">
            <p class="text-sm font-bold pt-3">Service:</p>
            <p class="text-sm">Service Name</p>
          </div>
          <div class="">
            <p class="text-sm font-bold pt-3">Status:</p>
            <p class="text-sm">Pending</p>
          </div>
        </div>

        <!-- Applicant Details -->
        <div class="mt-5 mb-5 flex px-2 justify-between">
          <div>
            <span class="block text-sm font-bold text-gray-500">Applicant Name:</span>
            <span class="block text-sm text-gray-800">Mwebe Raymond</span>
          </div>
          <div>
            <span class="block text-sm font-bold text-gray-500">Details Used:</span>
            <span class="block text-sm text-blue-600 hover:underline hover:cursor-pointer">NATIONAL ID</span>
          </div>
          <div>
            <span class="block text-sm font-bold text-gray-500">Date:</span>
            <span class="block text-sm text-gray-800">2024-12-19</span>
          </div>
        </div>

        <!-- Contact Information -->
        <!-- <div class="flex bg-gray-50 p-2 mt-2 rounded"> -->
        <div class="flex p-2 mt-2 rounded">
          <div class="w-full py-3">
            <div class="flex text-gray-600">
              <div class="w-full text-sm">
                <p class="font-bold">Agent Information</p>
                <!-- <p class="text-sm">Mwebe Raymond</p> -->
                <p class="text-sm">Posta Uganda, Kampala Branch</p>
                <!-- <p class="text-sm">info@nira.com</p> -->
                <p class="text-sm">25678346573</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4 mt-6">
          <button @click="showQueryModal = true" class="px-4 py-1 bg-amber-600 text-white rounded-md hover:bg-amber-500 transition">
            <i class="fa fa-exclamation-circle"></i>
            Query
          </button>
          <button @click="showRejectModal = true" class="px-4 py-1 bg-red-700 text-white rounded-md hover:bg-red-600 transition">
            <i class="fa fa-times-square"></i>
            Reject
          </button>
          <button @click="showApproveModal = true" class="px-4 py-1 bg-green-700 text-white rounded-md hover:bg-green-600 transition">
            <i class="fa fa-check"></i>
            Approve
          </button>
        </div>
      </div>
    </div>

    <!-- Approve Modal -->
    <AppModal v-model="showApproveModal" xl>
      <div class="flex">
        <div class="w-full">
          <div class="flex">
            <span class="mx-auto text-center justify-center">
              <i class="mx-auto fa-solid fa-exclamation-circle text-3xl text-danger"></i>
            </span>
          </div>
          <p class="py-5 text-center">Are you sure you want to approve this service request?</p>
          <div class="flex w-1/2 gap-2 justify-center mx-auto">
            <button class="bg-gray-600 hover:bg-gray-500 w-1/2 rounded text-white" @click="showApproveModal = false">
              <i class="fa-solid fa-times-circle mx-1"></i> Cancel
            </button>
            <button class="bg-primary text-white p-1 w-1/2 rounded hover:bg-red-800" @click="rejectRequest">
              <i class="fa-solid fa-check-circle mx-1"></i> Confirm
            </button>
          </div>
        </div>
      </div>
    </AppModal>

    <!-- Reject Modal -->
    <AppModal v-model="showRejectModal" xl>
      <div class="flex">
        <div class="w-full">
          <div class="flex">
            <span class="mx-auto text-center justify-center">
              <i class="mx-auto fa-solid fa-exclamation-circle text-3xl text-danger"></i>
            </span>
          </div>
          <p class="py-5 text-center">Are you sure you want to reject this service request?</p>
          <div class="flex w-1/2 gap-2 justify-center mx-auto">
            <button class="bg-gray-600 hover:bg-gray-500 w-1/2 rounded text-white" @click="showRejectModal = false">
              <i class="fa-solid fa-times-circle mx-1"></i> Cancel
            </button>
            <button class="bg-primary text-white p-1 w-1/2 rounded hover:bg-red-800" @click="rejectRequest">
              <i class="fa-solid fa-check-circle mx-1"></i> Confirm
            </button>
          </div>
        </div>
      </div>
    </AppModal>

    <!-- Query Modal -->
    <AppModal v-model="showQueryModal" xl>
      <div class="flex">
        <div class="w-full">
          <div class="flex">
            <span class="mx-auto text-center justify-center">
              <i class="mx-auto fa-solid fa-exclamation-circle text-3xl text-danger"></i>
            </span>
          </div>
          <p class="py-5 text-center">Are you sure you want to query this service request?</p>
          <div class="flex w-1/2 gap-2 justify-center mx-auto">
            <button class="bg-gray-600 hover:bg-gray-500 w-1/2 rounded text-white" @click="showQueryModal = false">
              <i class="fa-solid fa-times-circle mx-1"></i> Cancel
            </button>
            <button class="bg-primary text-white p-1 w-1/2 rounded hover:bg-red-800" @click="rejectRequest">
              <i class="fa-solid fa-check-circle mx-1"></i> Confirm
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<style scoped>
.service-thumbnail {
  width: 100px;
  height: auto;
}
</style>
