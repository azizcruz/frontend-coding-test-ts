import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import LayoutMain from "../components/layout/LayoutMain.vue";
import Error from "../views/Error.vue";
import Home from "../views/Home.vue";
import Countries from "../views/Countries/Countries.vue";
import CountryDetails from "../views/Countries/components/CountryDetails.vue";

const mainRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Home,
  },
  {
    path: "/countries",
    name: "countries",
    props: true,
    component: Countries,
  },
  {
    path: "/countries/:code",
    name: "country-details",
    props: true,
    component: CountryDetails,
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/error",
    alias: "/:pathMatch(.*)*",
    name: "Error",
    props: true,
    component: Error,
  },
  {
    path: "/",
    props: true,
    component: LayoutMain,
    children: mainRoutes,
  },
];

export default function initializeRouter(app: App): Router {
  const router: Router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { top: 0 };
    },
  });

  app.use(router);

  return router;
}
