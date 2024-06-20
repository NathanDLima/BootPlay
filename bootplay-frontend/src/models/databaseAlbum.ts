import { UserModel } from "./UserModel";

export interface databaseAlbum {
    id?: number;
    name?: string;
    idSpotify?: string;
    artistName?: string;
    imageUrl?: string;
    value?: number;
    users?: UserModel;
}