import axios, { AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
    baseURL: 'http://192.168.1.3:3333'
//   baseURL: 'http://localhost:3333',
});

api.interceptors.response.use((response) => response, error => {

    if(error.response && error.response.data) {       
        return Promise.reject(new AppError(error.response.data.message))

    } else {
        return Promise.reject(new AppError('Erro no servidor. Tente mais tarde!'))
    }
});

export { api };



















// import axios, { AxiosInstance } from "axios";

// import { AppError } from "@utils/AppError";

// import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

// type PromiseType = {
//   resolve: (value?: unknown) => void;
//   reject: (reason: unknown) => void;
// }

// type ProccessQueueParams = {
//   error: Error | null;
//   token: string | null;
// }

// type RegisterInterceptTokenManagerProps = {
//   signOut: () => void;
//   refreshTokenUpdated: (newToken: string) => void;
// }

// type APIInstanceProps = AxiosInstance & {
//   registerInterceptTokenManager: ({}: RegisterInterceptTokenManagerProps) => () => void;
// }

// const api = axios.create({
//   baseURL: 'http://localhost:3333',
// }) as APIInstanceProps;

// let isRefreshing = false;
// let failedQueue: Array<PromiseType> = [];

// const proccessQueue = ({ error, token = null  }:ProccessQueueParams): void => {
//   failedQueue.forEach(request => {
//     if(error) {
//       request.reject(error);
//     } else {
//       request.resolve(token);
//     }
//   });

//   failedQueue = [];
// }

// api.registerInterceptTokenManager = ({ signOut, refreshTokenUpdated }) => {
//   const interceptTokenManager = api.interceptors.response.use((response) => response, async requestError => {
//     if(requestError.response?.status === 401) {
//       if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
//         const oldToken = await storageAuthTokenGet();

//         if(!oldToken) {
//           signOut();
//           return Promise.reject(requestError);
//         }

//         const originalRequest = requestError.config;

//         if(isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//           })
//           .then((token) => {
//             originalRequest.headers['Authorization'] = `Bearer ${token}`
//             return axios(originalRequest);
//           })
//           .catch((error) => {
//             throw error;
//           })
//         }

//         isRefreshing = true;

//         return new Promise(async (resolve, reject) => {
//           try {
            
//             const { data } = await api.post('/sessions/refresh-token', { token: oldToken });
//             await storageAuthTokenSave(data.token);
            
//             api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//             originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
            
//             refreshTokenUpdated(data.token);
//             proccessQueue({ error: null, token: data.token });

//             console.log('TOKEN ATUALIZADO');
//             resolve(originalRequest)
//           }
//           catch (error: any) {
//             proccessQueue({ error, token: null });
//             signOut();
//             reject(error);
//           } finally {
//             isRefreshing = false;
//           }
//         });
        
//       }
      
//       signOut();
      
//     }

//     if(requestError.response && requestError.response.data) {
//       return Promise.reject(new AppError(requestError.response.data.message))
//     } else {
//       return Promise.reject(requestError)
//     }
//   });

//   return () => {
//     api.interceptors.response.eject(interceptTokenManager);
//   }
// }



// export { api };