import { useContext } from "react";
import linkticApi from "../../api/linkticApi";
import { UserContext } from "../Context/UserContext";
import Swal from "sweetalert2";


export const useAuthStore = () => {

    const { loggedIn, logout } = useContext(UserContext);

    const startLogin = async (email, password) => {

        try {

            const resp = await linkticApi.post('/auth/login', { email, password },);

            if (resp.status === 200) {

                loggedIn(resp.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    text: 'Has iniciado sesión correctamente'
                })

            } else if (resp.status === 401) {

                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Ooops! Algo salió Mal...',
                        text: 'Contraseña o usuario equivocado'
                    }
                )

            }

            return true;

        } catch (err) {

            if (err.response.status === 401) {
                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Ooops! Algo salió Mal...',
                        text: 'Contraseña o usuario incorrectos'
                    }
                )
            } else {
                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Ooops! Algo salió Mal...',
                        text: 'Servidor en mantenimiento'
                    }
                )
            }

        }

    }

    const checkAuthToken = async () => {

        if (!sessionStorage.getItem('user')) return

        try {
            const user = sessionStorage.getItem('user')
            const { uid } = JSON.parse(user)
            const result = await linkticApi.post('/auth/renew', { uid })
            loggedIn(result.data)
            console.log('token renovado')
            return


        } catch (error) {

            Swal.fire(
                {
                    icon: 'warning',
                    text: 'Se ha expirado la sesión'
                }
            )
            logout()

        }

    }

    const closeSession = async () => {
        logout()
    }

    return {
        startLogin,
        checkAuthToken,
        closeSession
    }

}