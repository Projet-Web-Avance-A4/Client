import { User } from "./user";

export interface HeaderContextProps {
    user: User | null;
    showMyAccount: boolean;
    showSponsor: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setShowMyAccount: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSponsor: React.Dispatch<React.SetStateAction<boolean>>;
}