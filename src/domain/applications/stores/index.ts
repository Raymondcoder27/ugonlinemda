
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
    { id: 1, requestDate: "2021-09-01", service: "Company Incorporation", status: "pending", applicant: "Till 004"},
    { id: 2, requestDate: "2021-09-02", service: "Tax Clearance", status: "approved", applicant: "Till 005"},
    { id: 3, requestDate: "2021-09-03", service: "Company Incorporation", status: "rejected", applicant: "James Kangave"},
    { id: 4, requestDate: "2021-09-04", service: "Tax Clearance", status: "pending", applicant: "Till 006"},
  ];

  const serviceRequests: Ref<ServiceRequest[]> = ref(dummyServiceRequests);

  const fetchFloatRequests = async () => {
  //   return api.get("/float-requests").then((response:any) => {
  //     floatRequests.value = response.data.data
  serviceRequests.value = dummyServiceRequests;
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
    fetchFloatRequests,
    fetchApplications,
    fetchApplicationStats
  };
})
