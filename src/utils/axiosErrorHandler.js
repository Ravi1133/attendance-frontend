import { toast } from "react-toastify";
// import { getToken } from "./utils";
// import history from "./history";


export const axiosErrorHandler = (error, action, checkUnauthorized = true) => {

    const requestStatus = error?.request?.status;
    const responseStatus = error?.response?.status;
    const dataStatus = error?.data?.statusCode;

    if (dataStatus === 401 || responseStatus === 401 || requestStatus === 401) {
        // Clear local storage and redirect to /login
        localStorage.clear();
        toast.error(
            error?.response?.data?.error || error?.response?.data?.error || error?.data?.error,
        );
        window.location.href = "/login";
    }
    if (dataStatus === 404 || responseStatus === 404 || requestStatus === 404) {
        if (Array.isArray(error?.response?.data?.error) || Array?.isArray(error?.data?.error)) error?.response?.data?.error?.map(er => toast.error(er)) || error?.data?.error?.map(er => toast.error(er))
        else
            toast.error(
                error?.response?.data?.error || error?.response?.data?.error || error?.data?.error,
            );
    }
    if (dataStatus === 400 || responseStatus === 400 || requestStatus === 400 || requestStatus === 502) {
        // console.log("error log is", error)
        
        if (Array.isArray(error?.response?.data?.errors) || Array?.isArray(error?.data?.errors)) error?.response?.data?.errors?.map(er => toast.error(er.message)) || error?.data?.message?.map(er => toast.error(er))
        else
            toast.error(
                error?.response?.data?.message || error?.response?.data?.data || error?.data?.message,
            );
    }
    if (
        checkUnauthorized &&
        (dataStatus === 409 || responseStatus === 409 || requestStatus === 409)
    ) {
        // if (getToken()) {
        //     toast.error(error?.response?.data?.message);
        // }
    }

    if (action === "uploadImage") {
        // if (dataStatus === 500 || responseStatus === 500 || requestStatus === 500) {
        //     if (getToken()) {
        //         const message = error?.response?.data?.message;
        //         message && toast.error(message);
        //     } else history.push("/");
        // }
    }

    if (error?.response) return error.response;
    else if (error?.request) return error.request;
    else return error?.message;
};