export default [
  {
    path: '/hospital/dashboard',
    name: 'Hospital-Dashboard',
    component: () => import(/* webpackChunkName: "hospital-dashboard" */ '../../views/hospitalHead/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/hospital/my',
    name: 'Hospital-My',
    component: () => import(/* webpackChunkName: "hospital-my" */ '../../views/hospitalHead/MyHospital.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/hospital/departments',
    name: 'Hospital-Departments',
    component: () => import(/* webpackChunkName: "hospital-departments" */ '../../views/hospitalHead/Departments.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/hospital/departmentStaff',
    name: 'Hospital-Department-Staff',
    component: () => import(/* webpackChunkName: "hospital-department-staff" */ '../../views/hospitalHead/DepStaff.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/hospital/departmentAppointments',
    name: 'Hospital-Department-Appointments',
    component: () => import(/* webpackChunkName: "hospital-department-appointments" */ '../../views/hospitalHead/DepAppointments.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/hospital/patients',
    name: 'Hospital-patients',
    component: () => import(/* webpackChunkName: "hospital-department-patients" */ '../../views/hospitalHead/Patients.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/hospital/statistics',
    name: 'Hospital-Statistics',
    component: () => import(/* webpackChunkName: "hospital-department-statistics" */ '../../views/hospitalHead/Statistics.vue'),
    meta: {
      requiresAuth: true,
    },
  }
]