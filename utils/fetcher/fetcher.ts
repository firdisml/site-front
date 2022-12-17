import axios, { AxiosResponse } from "axios";
import { IncomingMessage, ServerResponse } from "http";

export type QueryResponse<T> = [error: string | null, data: T | null];
import { getError } from "../error/error";
import { AxiosError } from "axios";


const refreshTokens = async (req: IncomingMessage, res: ServerResponse) => {
  const response = await axios.post(
    "http://localhost:3000/auth/refresh",
    undefined,
    {
      headers: { cookie: req.headers.cookie },
    }
  );
  const cookies: any = response.headers["set-cookie"];

  req.headers.cookie = cookies;

  res.setHeader("set-cookie", cookies);
};

const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  request: () => Promise<AxiosResponse>
) => {
  try {
    return await request();
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        try {
          await refreshTokens(req, res);
          return await request();
        } catch (innerError: any) {
          throw getError(innerError);
        }
      }
    }

    throw getError(err);
  }
};

export const fetcher = async <T>(
  req: IncomingMessage,
  res: ServerResponse,
  url: string
): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.get(url, { headers: { cookie: req.headers.cookie } });
    const { data } = await handleRequest(req, res, request);
    return [null, data] as any;
  } catch (error: any) {
    return [error, null];
  }
};
