export const getEnvVariables = () => {
    return {
        API_URL: import.meta.env.VITE_API_URL,
    }
}