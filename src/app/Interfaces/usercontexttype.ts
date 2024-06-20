import { User } from "./user";

export interface userContextType {
    userData: User | null;
    getUserData: (user: User | null) => void;
}