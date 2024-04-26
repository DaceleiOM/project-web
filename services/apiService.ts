import { getCookie } from "cookies-next";

const urlApi =
  process.env.NEXT_PUBLIC_NODE_PROD == "production"
    ? process.env.NEXT_PUBLIC_APIURL_PROD
    : process.env.NEXT_PUBLIC_APIURL_DEV;

const fetchAPI = async (url: string, method: string, params: any = {}, multipart: boolean) => {
  const headers = new Headers();
  const token = getCookie("token") ?? "";

  !multipart ? headers.append('Content-Type',  "application/json") : null;
  token ? headers.append("x-auth-token", token?.toString()) : null;

  const options = {
    method,
    headers,
    body: (["POST", "PUT"].includes(method) && multipart) 
          ? params 
          : ["POST", "PUT", "DELETE"].includes(method) 
            ? JSON.stringify(params) 
            : undefined
  };

  const res = await fetch(urlApi + url, options);

  if (res.status === 400) throw new Error("Bad Request");
  if (res.status === 401) {
    if (window) {
      window.location.replace("/?unauthorized=true");
      throw new Error("Unauthorized");
    }
  }
  if (res.status === 404) throw new Error("Not Found");
  if (res.status === 500) throw new Error("Internal error");
  if (res.status === 504) throw new Error("Gateway Time-out");

  const json = await res.json();

  if (json?.data?.error || json.error) {
    const error = json?.data?.error || json.error;
    throw new Error(error);
  }

  return json;
};

export const apiService = async (url: string, method: string, params?: any, multipart = false ) => {
  return await fetchAPI(url, method, params, multipart);
};
