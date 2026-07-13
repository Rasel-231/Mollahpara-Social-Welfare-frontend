import axios, { AxiosError, AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const axiosBaseQuery =

    ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                const axiosConfig: Record<string, unknown> = {
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    withCredentials: true,
                };
                if (headers) {
                    axiosConfig.headers = headers;
                }
                const result = await axios(axiosConfig);

                return { data: result.data };
            } catch (error) {
                const err = error as AxiosError;

                if (err.response?.status === 401) {
                    try {
                        await axios.post(
                            `${baseUrl}auth/refresh-token`,
                            {},
                            { withCredentials: true }
                        );

                        const retry = await axios({
                            url: baseUrl + url,
                            method,
                            data,
                            params,
                            headers,
                            withCredentials: true,
                        });

                        return { data: retry.data };
                    } catch {

                        return { error: { status: 401, data: "Session expired" } };
                    }
                }

                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };