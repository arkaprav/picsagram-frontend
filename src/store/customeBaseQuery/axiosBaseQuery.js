import axios from "axios"

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    const config = {
        headers,
        params
    };
    try {
        let result;
        if(method === "GET") {
            result = await axios.get(
                baseUrl + url,
                config
            );
        }
        if(method === "POST") {
            result = await axios.post(
                baseUrl + url,
                data,
                config
            );
        }
        if(method === "PUT") {
            result = await axios.put(
                baseUrl + url,
                data,
                config
            );
        }
        if(method === "DELETE") {
            result = await axios.delete(
                baseUrl + url,
                config
            );
        }
        return { data: result.data }
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
}

export { axiosBaseQuery };