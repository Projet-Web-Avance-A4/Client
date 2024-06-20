import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/user";

export const decodeAccessToken = (accessToken: string | null) => {
    if (accessToken) {
        const decodedToken = jwt.decode(accessToken);
        if (decodedToken && typeof decodedToken !== 'string') {
            const data: JwtPayload = decodedToken;
            const userData: User | null = {
                id_user: data.userId ?? 0,
                name: data.name ?? '',
                surname: data.surname ?? '',
                street: data.street ?? '',
                city: data.city ?? '',
                postal_code: data.postal_code ?? '',
                phone: data.phone ?? '',
                mail: data.mail ?? '',
                role: data.role ?? ''
            };
            return userData;
        }
    }
    return null;
};