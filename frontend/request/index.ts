import axios, {AxiosRequestConfig} from "axios";

const ax = axios.create({
	baseURL: "/api",
	headers: {
		"Content-type": "application/json",
	},
});

const getToken = () => {
    return window.localStorage.getItem('accessToken')
}

export function jwtInterceptor(request: AxiosRequestConfig) {
    // console.log(request);
    
    if (request.url === '/user' && request.method === 'get') {
        const token = getToken();
        if (token) {
            request.headers!.Authorization = `Bearer ${token}`;
        } else {
            // 未登录
            console.log('拦截');
        }
    }
    return request;
}

ax.interceptors.request.use(jwtInterceptor, error => Promise.reject(error))

export type User = string;

export interface UserResponse {
	sign: string;
}

export async function postUser(username: User) {
	try {
		const { data } = await ax.post("/user", {
			username
		});
		return data as UserResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("error message: ", error.message);
			return error.message;
		} else {
			console.log("unexpected error: ", error);
			return "An unexpected error occurred";
		}
	}
}

export async function getUser() {
	try {
		const { data } = await ax.get("/user");
		return data;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
            if (error.response!.status === 403) {
                throw ({
                    status: 403
                })
            } else {
                console.log("error message: ", error, error.message);
			    return error.message;
            }
		} else {
			console.log("unexpected error: ", error);
			return "An unexpected error occurred";
		}
	}
}
