import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetSharesResponse, getTransactionsResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Shares", "Transactions"],
    endpoints: (build) => ({
        // KPI Build
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"]
        }),
        // Shares Build
        getShares: build.query<Array<GetSharesResponse>, void>({
            query: () => "share/shares/",
            providesTags: ["Shares"]
        }),
        // Shares Build
        getTransactions: build.query<Array<getTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"]
        }),
    }),
});

export const { useGetKpisQuery, useGetSharesQuery, useGetTransactionsQuery } = api;


/*

FOR UPDATING OR DELETING

// Shares Build
        getShares: build.MUTATION<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"]
        }),

        */