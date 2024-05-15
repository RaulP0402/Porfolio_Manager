export interface Holdings {
    id: string;
    ticker: string;
    quantity: number;
    avgPurchasePrice: number;
}

export interface Month {
    id: string;
    month: string;
    profit: number;
    loss: number;
    capitolAllocated: number;
    capitolStored: number;
}

export interface Week {
    id: string;
    date: string;
    profit: number;
    loss: number;
}

export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    capitol: number;
    holdings: Array<Holdings>;
    monthlyData: Array<Month>;
    weeklyData: Array<Week>;
    createdAt: string;
    updatedAt: string;
}   


export interface GetSharesResponse {
    id: string;
    _id: string;
    __v: number;
    ticker: string;
    purchasePrice: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}   

export interface getTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    amount: number;
    buyer: string;
    shareIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface updateData {
    id: string;
    ticker: string;
    amount: number;
    quantity: number;
    buyer: string;
}