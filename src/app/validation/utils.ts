import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/user";

export const generateNewAccessToken = (refreshToken: string) => {
    try {
        const secretAccess = process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY || '';
        const secretRefresh = process.env.NEXT_PUBLIC_REFRESH_SECRET_KEY || '';
        const decoded = jwt.verify(refreshToken, secretRefresh);
        if (typeof decoded === 'object' && decoded !== null) {
            const data: JwtPayload = decoded as jwt.JwtPayload;
            const newAccessToken = jwt.sign({ ...data }, secretAccess);
            localStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        } else {
            console.error('decoded n\'est pas un objet JwtPayload');
        }
    } catch (error) {
        console.error('Error generating new access token:', error);
        throw error;
    }
};

export const verifyAndSetUser = (accessToken: string, setUser: (user: User) => void) => {
    try {
        const secret = process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY || '';

        const verifiedData = jwt.verify(accessToken, secret);
        if (typeof verifiedData !== 'string') {
            const data: JwtPayload = verifiedData;
            const userData: User = {
                name: data.name ?? '',
                surname: data.surname ?? '',
                street: data.street ?? '',
                city: data.city ?? '',
                postal_code: data.postal_code ?? '',
                phone: data.phone ?? '',
                mail: data.mail ?? '',
                role: data.role ?? ''
            };
            setUser(userData);
        }
    } catch (error) {
        console.error('Failed to parse access token or verify JWT:', error);
        throw error;
    }
};

export const handleTokenVerification = (setUser: (user: User) => void) => {
    let accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const secret = process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY || '';

    if (!accessToken) {
        console.error('No access token found in localStorage.');
        return;
    }

    try {
        verifyAndSetUser(accessToken, setUser);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError' && refreshToken) {
            try {
                const newAccessToken = generateNewAccessToken(refreshToken);
                if (typeof newAccessToken === 'string') {
                    accessToken = newAccessToken;
                    verifyAndSetUser(accessToken, setUser);
                }
            } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
            } finally {
                const verifiedData = jwt.verify(accessToken, secret)
                if (typeof verifiedData !== 'string') {
                    const data: JwtPayload = verifiedData;
                    const userData: User = {
                        name: data.name ?? '',
                        surname: data.surname ?? '',
                        street: data.street ?? '',
                        city: data.city ?? '',
                        postal_code: data.postal_code ?? '',
                        phone: data.phone ?? '',
                        mail: data.mail ?? '',
                        role: data.role ?? ''
                    };
                }
            }
        }
    }
};