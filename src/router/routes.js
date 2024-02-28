const Home = () => import("@/pages/HomeView.vue");
const Search = () => import("@/pages/SearchResult.vue");
const Solo = () => import("@/pages/SoloView.vue");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Search",
    component: Search,
  },
  {
    path: "/view/:id",
    name: "View",
    component: Solo,
  },
];
