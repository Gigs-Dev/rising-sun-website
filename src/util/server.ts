import axios from 'axios';


const SERVER = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_PRODUCTION_URI,
    // baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
    timeout: 100000,

    headers: {
        'Content-Type': 'application/json', 
        // 'Authorization': 'Bearer your_token', 
      },
})




export default SERVER;




// import { useEffect } from "react";
// import { AxiosRequestConfig, AxiosResponse } from "axios";
// import { useRefreshToken } from "./useRefreshToken";
// import { privateAxios, publicAxios } from "@/api/axios";
// import { useAccessTokenState } from "@/store/memory";

// export const usePrivateAxios = () => {
//   const refresh = useRefreshToken();
//   const accessToken = useAccessTokenState();

//   useEffect(() => {
//     // Append the access token to the request
//     const requestInterceptor = privateAxios.interceptors.request.use(
//       (config: AxiosRequestConfig) => {
//         config.headers = config.headers ?? {};
//         if (!config.headers["Authorization"]) {
//           config.headers["Authorization"] = `Bearer ${accessToken.value}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // Refresh the access token if it has expired, and retry the original request
//     const responseInterceptor = privateAxios.interceptors.response.use(
//       (response: AxiosResponse) => response,
//       async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           prevRequest.sent = true;
//           const newAccessToken = await refresh();
//           prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return privateAxios(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       privateAxios.interceptors.request.eject(requestInterceptor);
//       privateAxios.interceptors.response.eject(responseInterceptor);
//     };
//   }, [accessToken, refresh]);

//   return privateAxios;
// };

