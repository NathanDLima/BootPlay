import { UserModel } from "./UserModel";

export interface WalletModel {
    id?: number;
    balance?: number;
    points?: number;
    lastUpdate?: Date;
    users?: UserModel;
}