import { toast } from "react-toastify";
import { handleError } from "lib/helper";
import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const router = useRouter();

    const login = async (cellphone) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`, {
                cellphone
            })

            toast.success(res.data.message);

        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    const checkOtp = async (otp) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`, {
                otp
            })

            setUser(res.data.user);
            router.push('/')
        } catch (err) {
            toast.error(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, checkOtp, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;