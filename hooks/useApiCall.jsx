import { apiRequest } from "@/lib/apiRequest";
import { useAuth } from "@/context/authContext";
import { refreshAccessToken } from "@/lib/http";
const useApiCall = () => {
    const { accessToken, setAccessToken}=useAuth();

    async function getApi(config){
        const response= await apiRequest({...config,accessToken})
        if(response.status!==401){
            return response;
        }

        console.log('access token expire')

        try {
            const newAccessToken= await refreshAccessToken();

            const response=await apiRequest({...config,accessToken:newAccessToken})

          return  response;
        } catch (error) {
                setAccessToken(null)
                throw error;
        }

    }
  return {
    getApi
  }
}

export default useApiCall