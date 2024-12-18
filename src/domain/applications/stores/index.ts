
import {defineStore} from "pinia";
import {ref, type Ref} from "vue";
import api from "@/config/api";
import type {ApplicationStatistics, ClientApplication, ServiceRequest} from "@/domain/applications/types";

export const useApplications = defineStore("applications", () => {
  const applications: Ref<ClientApplication[] | undefined> = ref()
  const applicationStatistics: Ref<ApplicationStatistics | undefined> = ref()

  const fetchApplications = async (trackingNo:string, serviceId:string, providerId:string, status:string, page:number, limit:number) => {
    let path = "/registry/v1/applications?page="+page+"&limit="+limit
    if(trackingNo){
      path += "&tracking_no="+trackingNo
    }
    if(serviceId){
      path += "&service_id="+serviceId
    }
    if(providerId){
      path += "&provider_id="+providerId
    }
    if(status){
      path += "&status="+status
    }
    return api.get(path).then((response:any) => {
      applications.value = response.data.data
      console.log(response.data.data)
    })
  }

  // const dummyFloatRequests: FloatRequest[] = [
  //   { id: 1, requestDate: "2021-09-01", amount: 10000000, status: "pending", branch: "Branch 1", approvedBy: null },
  //   { id: 4, requestDate: "2021-09-04", amount: 40000000, status: "pending", branch: "Branch 4", approvedBy: null },
  //   { id: 2, requestDate: "2021-09-02", amount: 20000000, status: "approved", branch: "Branch 2", approvedBy: "Manager One" },
  //   { id: 3, requestDate: "2021-09-03", amount: 30000000, status: "rejected", branch: "Branch 3", approvedBy: null },
  // ];

  // const floatRequests: Ref<FloatRequest[]> = ref(dummyFloatRequests);

  //dummy service requests
  const dummyServiceRequests: ServiceRequest[] = [
    { id: 1, requestDate: "2021-09-01", serviceName: "Company Incorporation", status: "Pending", applicant: "Mwebe Raymond", trackingNo: "TRK-001"},
    { id: 2, requestDate: "2021-09-02", serviceName: "Compnay Name Reservation", status: "Approved", applicant: "Tumuhairwe Rodgers", trackingNo: "TRK-001"},
    { id: 3, requestDate: "2021-09-03", serviceName: "Company Incorporation", status: "Rejected", applicant: "James Kangave", trackingNo: "TRK-001"},
    { id: 4, requestDate: "2021-09-04", serviceName: "Company Insolvency", status: "Pending", applicant: "Mpagi Ronald", trackingNo: "TRK-001"},
  ];

  const serviceRequests: Ref<ServiceRequest[]> = ref(dummyServiceRequests);

  const fetchServiceRequests = async () => {
  //   return api.get("/float-requests").then((response:any) => {
  //     floatRequests.value = response.data.data
  serviceRequests.value = dummyServiceRequests;
  }


  // approve request
// const approveRequest = (id: string) => {
//   // store
//   //   .approveServiceRequest(id)
//   //   .then(() => {
//   //     notify.success("Request approved successfully");
//   //     fetch();
//   //   })
//   //   .catch((error: ApiError) => {
//   //     notify.error(error.response.data.message);
//   //   });
//   store.approveServiceRequest(id);
// };

     const approveServiceRequest = (id: string) => {
    // store
    console.log("Approving request with id: ", id);
    const request = serviceRequests.value.find((request) => request.id === id);
    if (request) {
      request.status = "Approved";
    }
  }


  const fetchApplicationStats = async (status:boolean) => {
    return api.get("/registry/v1/applications/stats?status="+status).then((response:any) => {
      applicationStatistics.value = response.data.data
      console.log(response.data.data)
    })
  }
  return {
    applications,
    applicationStatistics,
    serviceRequests,
    approveServiceRequest,
    fetchServiceRequests,
    fetchApplications,
    fetchApplicationStats
  };
})
