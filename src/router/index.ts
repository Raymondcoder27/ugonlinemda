import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import ServiceProviders from "@/domain/entities/AppEntities.vue";
import Services from "@/domain/services/AppServices.vue";
import Accounts from "@/domain/accounts/Accounts.vue";
import ServiceRequests from "@/domain/applications/ServiceApplications.vue";
import FormComposer from "@/domain/composer/FormComposer.vue";
import { routes as authRoutes } from "@/domain/auth/routes"
import {useAuth} from "@/domain/auth/composables";
import moment from "moment";
import ComposerLayout from "@/layouts/ComposerLayout.vue";
import FormPreview from "@/domain/composer/FormPreview.vue";
import ServiceDetails from "@/domain/services/views/ServiceDetails.vue";
import ServiceProviderDetails from "@/domain/entities/views/ServiceProviderDetails.vue";
import DataAnalytics from "@/domain/analytics/DataAnalytics.vue";
import Settings from "@/domain/settings/Settings.vue";
import AppEntities from "../domain/entities/AppEntities.vue";
import AppDashboard from "../domain/dashboard/AppDashboard.vue";
import AppAgents from "../domain/agents/AppAgents.vue";
import AppGateway from "../domain/gateway/AppGateway.vue";
import AppFinances from "../domain/finances/AppFinances.vue";
import ServicesDetails from "../domain/servicesdetails/ServicesDetails.vue";
import Branches from "../domain/branches/AppBranches.vue";
import Ledger from "../domain/ledger/Ledger.vue";
import Submissions from "../domain/submissions/Submissions.vue";
import AppServices from "../domain/services/AppServices.vue";

declare module "vue-router" {
  interface RouteMeta {
    parentName?: string
    requiresAuth: boolean
  }
}

const appRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "app-home" },
  },
  {
    path: "/agent",
    name: "app-home",
    component: MainLayout,
    meta: { requiresAuth: false },

    // component: () => import("@/domain/dashboard/AppDashboard.vue"),
        redirect: "/agent/services",

    children: [
      {
        name: "app-services",
        path: "/agent/services",
        component: AppServices,
      },
      {
        name: "app-entities",
        path: "/agent/entities",
        component: AppEntities,
      },
      {
        name: "app-services",
        path: "/agent/services",
        component: Services,
      },
      {
        name: "app-branches",
        path: "/agent/branches",
        component: Branches,
      },
      {
        name: "app-accounts",
        path: "/agent/accounts",
        component: Accounts
      },
      {
        name: "app-configurations",
        path: "/agent/configurations",
        component: Settings
      },
      {
        name: "app-ledger",
        path: "/agent/ledger",
        component: Ledger
      },
      {
        name: "app-services-details",
        path: "/agent/services-details",
        component: ServicesDetails
      },
      {
        name: "app-finances",
        path: "/agent/finances",
        component: AppFinances
      },
      {
        name: "app-gateway",
        path: "/agent/gateway",
        component: AppGateway
      },
      {
        name: "app-submissions",
        path: "/agent/submissions",
        component: Submissions
      },
    ]
  },
  {
    name: "service-details",
    path: "/service/:id",
    component: ServiceDetails
  },
  {
    name: "provider-details",
    path: "/provider/:id",
    component: ServiceProviderDetails
  },
  ...authRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: appRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: "smooth" }
    }
  }
})

router.beforeEach((to, from, next) => {
  const { credentials, refreshToken } = useAuth()

  if (to.meta.requiresAuth) {
    if (credentials.value === undefined || refreshToken.value === undefined || refreshToken.value.exp < moment().unix()) {
      next({ name: "app-account-sign-in" })
    }
  } else if (to.name === "app-account-sign-in" && credentials.value !== undefined && refreshToken.value !== undefined) {
    next({ name: "app-home" })
  }

  next()
})
export default router
