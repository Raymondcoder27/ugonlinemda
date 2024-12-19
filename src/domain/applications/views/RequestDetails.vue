<script setup lang="ts">
</script>

<template>
  <div class="flex p-2 bg-white">
    <div class="w-full text-xs">
      <!-- place a tab showing Service Requests / Request Details with those two being router links -->
      <router-link to="/applications/requests" class="cursor-pointer py-2 bg-gray-50 rounded-md">Service Requests</router-link> /
      Request Details

      <!-- place a card showing the details of the request, (tracking number, service, service description, applicant name, details used (eg national id) status, date) -->
      <div class="bg-white shadow-md rounded my-6">
        <table class="text-left w-full border-collapse">
          <thead>
            <tr>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Tracking Number
              </th>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Service
              </th>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Service Description
              </th>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Applicant Name
              </th>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Details Used
              </th>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Status
              </th>
              <th
                class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-grey-lighter">
              <td class="py-4 px-6 border-b border-grey-light">123456</td>
              <td class="py-4 px-6 border-b border-grey-light">Service</td>
              <td class="py-4 px-6 border-b border-grey-light">
                Service Description
              </td>
              <td class="py-4 px-6 border-b border-grey-light">
                Applicant Name
              </td>
              <td class="py-4 px-6 border-b border-grey-light">Details Used</td>
              <td class="py-4 px-6 border-b border-grey-light">Status</td>
              <td class="py-4 px-6 border-b border-grey-light">Date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>