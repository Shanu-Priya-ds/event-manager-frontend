import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../services/api";
import type { ApiState, ApitInputProps } from "../types/apiTypes";

function useApi<T>({ url, method, autoFetch }: ApitInputProps) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });
    const execute = useCallback(async (data?: unknown): Promise<T | null> => {
        try {
            //reset the state
            setState({ data: null, loading: true, error: null });
            const response = await axiosInstance({
                url,
                method,
                data: method !== "GET" ? data : undefined
            });
            setState({ data: response.data as T, loading: false, error: null })
            return response.data as T

        } catch (error: any) {
            console.log(error.response);
            let errorMessage = 'Failed to fetch data';
            //retrieve the proper error message being sent from backend, updae the errorMsg
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setState({ data: null, loading: false, error: errorMessage });
            return null;
        }
    }, [url, method]);

    useEffect(() => {
        if (autoFetch)
            execute();
    }, [url, autoFetch, execute]);
    return { ...state, execute };
}
export default useApi;