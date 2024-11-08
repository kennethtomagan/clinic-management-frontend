const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard', 
        name: 'dashboard', 
        component: () => import('pages/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true }
      },

      // {path: '/Dashboard2', component: () => import('src/pages/old/Dashboard2.vue')},
      {path: '/Profile', component: () => import('src/pages/old/UserProfile.vue')},
      {path: '/Map', component: () => import('src/pages/old/Map.vue')},
      {path: '/MapMarker', component: () => import('src/pages/old/MapMarker.vue')},
      {path: '/TreeTable', component: () => import('src/pages/old/TreeTable.vue')},
      {path: '/StreetView', component: () => import('src/pages/old/StreetView.vue')},
      {path: '/Cards', component: () => import('src/pages/old/Cards.vue')},
      {path: '/Tables', component: () => import('src/pages/old/Tables.vue')},
      {path: '/Contact', component: () => import('src/pages/old/Contact.vue')},
      {path: '/Checkout', component: () => import('src/pages/old/Checkout.vue')},
      {path: '/Ecommerce', component: () => import('src/pages/old/ProductCatalogues.vue')},
      {path: '/Pagination', component: () => import('src/pages/old/Pagination.vue')},
      {path: '/Charts', component: () => import('src/pages/old/Charts.vue')},
      {path: '/Calendar', component: () => import('src/pages/old/Calendar.vue')},
      {path: '/Directory', component: () => import('src/pages/old/Directory.vue')},
      {path: '/Footer', component: () => import('src/pages/old/Footer.vue')},
      {path: '/CardHeader', component: () => import('src/pages/old/CardHeader.vue')},

      // Not completed yet
      {path: '/Taskboard', component: () => import('src/pages/old/TaskBoard.vue')},
    ]
  },


  {
    path: '/patients',
    component: () => import('layouts/PatientsLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard', 
        name: 'patients.dashboard', 
        component: () => import('pages/patients/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'book-apointment', 
        name: 'patients.book-apointment', 
        component: () => import('pages/patients/appointment/BookAppointment.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'apointment-list', 
        name: 'patients.apointment-list', 
        component: () => import('pages/patients/appointment/AppointmentList.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'doctor-list', 
        name: 'patients.doctors', 
        component: () => import('pages/patients/doctors/DoctorList.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'notifications', 
        name: 'patients.notifications', 
        component: () => import('pages/patients/notification/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile', 
        name: 'patients.profile', 
        component: () => import('pages/patients/profile/Index.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404/Error404.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/auth/Register.vue')
  },


  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('src/pages/old/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('src/pages/old/Pricing.vue')
  },
  {
    path: '/Login-1',
    component: () => import('src/pages/old/Login-1.vue')
  },
  {
    path: '/Lock',
    component: () => import('src/pages/old/LockScreen.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('src/pages/old/LockScreen-2.vue')
  }
]


export default routes
