import { useState, useEffect } from 'react';

export const useHttpErrorHandler = axiosClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = axiosClient.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    const resInterceptor = axiosClient.interceptors.response.use(res => res, err => {
      setError(err);
    });

    useEffect(() => {
      return () => {// * Delete interceptors before component will be destroy
        axiosClient.interceptors.request.eject(reqInterceptor);
        axiosClient.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler];
}
