<script setup lang="ts">
</script>

<template>
  <div class="flex py-4 bg-gray-50 min-h-screen">
    <div class="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <!-- Breadcrumb -->
      <div class="text-sm mb-4">
        <router-link to="/mda/service-requests" class="text-gray-500 hover:text-gray-700">Service Requests</router-link>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-700 font-semibold">Request Details</span>
      </div>

      <!-- Details Card -->
      <div class="space-y-4">
        <div class="text-lg font-semibold text-gray-800">Request Details</div>

        <div class="space-y-2">
          <div>
            <span class="block font-medium text-gray-600">Tracking Number:</span>
            <span class="block text-gray-800">123456</span>
          </div>
          <div>
            <span class="block font-medium text-gray-600">Service:</span>
            <span class="block text-gray-800">Service Name</span>
          </div>
          <div>
            <span class="block font-medium text-gray-600">Service Description:</span>
            <span class="block text-gray-800">Description of the requested service.</span>
          </div>
          <div>
            <span class="block font-medium text-gray-600">Applicant Name:</span>
            <span class="block text-gray-800">John Doe</span>
          </div>
          <div>
            <span class="block font-medium text-gray-600">Details Used:</span>
            <span class="block text-gray-800">National ID</span>
          </div>
          <div>
            <span class="block font-medium text-gray-600">Status:</span>
            <span class="block text-gray-800">Pending</span>
          </div>
          <div>
            <span class="block font-medium text-gray-600">Date:</span>
            <span class="block text-gray-800">2024-12-19</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4 mt-6">
        <button class="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Reject
        </button>
        <button class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
          Approve
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
