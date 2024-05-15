import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetSharesResponse, getTransactionsResponse, updateData } from "./types";

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
        // Transactions Build
        getTransactions: build.query<Array<getTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"]
        }),
        // Add Transaction
        addTransaction: build.mutation<updateData, updateData>({
            query: ({ticker, quantity, amount, buyer, id}) => ({
                url: "update/updates",
                method: "PUT",
                body: {ticker, quantity, amount, buyer, id},
            }),
            invalidatesTags: ["Kpis", "Shares", "Transactions"],
        })
    }),
});

export const { useGetKpisQuery, useGetSharesQuery, useGetTransactionsQuery, useAddTransactionMutation } = api;
