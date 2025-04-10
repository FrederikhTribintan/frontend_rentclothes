import { createRouter, createWebHistory } from 'vue-router'
import ItemsList from "../components/ItemsList.vue";
import ItemsCreate from "../components/ItemsCreate.vue";
import ItemsDetails from "../components/ItemsDetails.vue";
import ItemsEdit from "../components/ItemsEdit.vue";
import UserList from "../components/UserList.vue";
import UserCreate from "../components/UserCreate.vue";
import UserDetails from "../components/UserDetails.vue";
import UserEdit from "../components/UserEdit.vue";
import RentList from "../components/RentList.vue";
import RentDetails from "../components/RentDetails.vue";
import RentEdit from "../components/RentEdit.vue";
import RentCreate from "../components/RentCreate.vue";
import TransactionList from "../components/TransactionList.vue";
import TransactionDetails from "../components/TransactionDetails.vue";
import TransactionEdit from "../components/TransactionEdit.vue";
import TransactionCreate from "../components/TransactionCreate.vue";
import HistoriList from "../components/HistoriList.vue";
import HistoriEdit from "../components/HistoriEdit.vue";
import HistoriDetails from "../components/HistoriDetails.vue";
import historiCreate from "../components/HistoriCreate.vue";
import Login from "../components/Login.vue";
import { useAuthStore } from "../stores/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      },
      
    {
      path: '/',
      name: 'home',
      component: ItemsList
    },
    {
      path: '/create',
      name: 'itemscreate',
      component: ItemsCreate
    },
    {
      path: '/items/:id',
      name: 'itemsdetails',
      component: ItemsDetails
    },
    {
      path: '/items/:id/edit',
      name: 'itemsedit',
      component: ItemsEdit 
    },
    {
      path: '/user',
      name: 'userlist',
      component: UserList
    },
    {
      path: '/user/create',
      name: 'usercreate',
      component: UserCreate
    },
    {
      path: '/user/:id/',
      name: 'userdetails',
      component: UserDetails 
    },
    {
      path: '/user/:id/edit',
      name: 'useredit',
      component: UserEdit 
    },
    {
      path: '/rent',
      name: 'rentlist',
      component: RentList
    },
    {
     path: '/rent/create',
     name: 'rentcreate',
     component: RentCreate
    },
    {
     path: '/rent/:id/',
     name: 'rentdetails',
     component: RentDetails 
    },
    {
      path: '/rent/:id/edit',
      name: 'rentedit',
      component: RentEdit 
    },
    {
     path: '/transaction',
      name: 'transactionlist',
    component: TransactionList
   },
 {
   path: '/transaction/create',
   name: 'transactioncreate',
   component: TransactionCreate
    },
   {
    path: '/transaction/:id/',
    name: 'transactiondetails',
    component: TransactionDetails 
    },
   {
     path: '/transaction/:id/edit',
     name: 'transactionedit',
    component: TransactionEdit 
    },
    {
      path: '/histori',
       name: 'historilist',
     component: HistoriList
    },
  {
    path: '/histori/create',
    name: 'historicreate',
   component: historiCreate
    },
   {
     path: '/histori/:id/',
    name: 'historidetails',
   component: HistoriDetails 
    },
   {
     path: '/histori/:id/edit',
      name: 'historiedit',
   component: HistoriEdit 
     },
  ]
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== "login" && !authStore.isLoggedIn) {
  next({ name: "login" });
  } else {
  next();
  }
  });
  

export default router
