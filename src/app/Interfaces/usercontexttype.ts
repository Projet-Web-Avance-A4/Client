import { User } from "./user";

export interface userContextType {
    userData: User | undefined;
    getUserData: (user: User | undefined) => void;
}