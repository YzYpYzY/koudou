export interface IPayment {
    id: number;
    name: string;
    type: PaymentTypes;
    amount: number;
    deadline: string;
    countPayed: number;
    countTotal: number;
}

export enum PaymentTypes {
    Cotisation,
    Camp,
    Hike,
    Autre,
}
