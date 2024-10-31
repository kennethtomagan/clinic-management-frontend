import axios from 'axios';
import { useUser } from 'stores/auth';

export default async ({ store, router, app }) => {
  const setAuthorization = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const storeUser = useUser();

  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const authToken = JSON.parse(localStorage.getItem('auth_token')); // No need to parse as it's a string

    if (authToken) {
      // Set the token in axios
      setAuthorization(authToken);

      try {
        // await storeUser.getAuthUser(authToken);  // getAuthUser should fetch the user
        const currentUser = storeUser.currentUser;

        // // If a valid user is found, proceed
        // if (currentUser.value?.token) {
        //   setAuthorization(currentUser.value.token); // Set the authorization header with the new token if necessary
        // }

        // Redirect to dashboard if login is not required

        if (to.name === 'login' || to.path === '/') {

          // if (currentUser.value.type == 'patient') {
          //   next('patients.dashboard');
          // } else {
            next('dashboard');
          // }
        } else {
          next();
        }
        // next();

      } catch (error) {
        // If there's an error (like a 401), clear the token and redirect to login
        // localStorage.removeItem('auth_token');
        next('login');
      }
    } else {
      // If no token and the route requires auth, redirect to login
      if (requiresAuth) {
        next('login');
      } else {
        next();
      }
    }
  });

  // Axios response interceptor to handle 401/403 globally
  axios.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
      const status = error.response ? error.response.status : null;
      
      if (status === 401 || status === 403) {
        // Remove the token from localStorage and redirect to login if unauthorized
        localStorage.removeItem('auth_token');
        router.push('login');
      }

      return Promise.reject(error); // Ensure the error is propagated
    }
  );
};
