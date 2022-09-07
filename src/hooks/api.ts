import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const getBackendURL = (endpoint: string) => {
  // uncomment this for local dev
  return 'http://localhost:5001' + endpoint
  // const url = appEnv ? appEnv + endpoint : ("http://localhost:5000" + endpoint);
  return url
}

const fetchAccount = async (url: string) => {
  const response = await axios.get(url)
  return response.data.data
}

const useAccount = (accountId: string) => {
  const url = getBackendURL(`/api/accounts/${accountId}`)
  return useQuery(['account', accountId], () => fetchAccount(url))
}

const useCreateAccount = () => {
  const queryClient = useQueryClient()
  const url = getBackendURL('/api/account')

  return useMutation(
    (data: any) =>
      axios.post(url, {
        ...data
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['account'])
      },
    }
  )
}

const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (data: any) => {
      const { accountId } = data
      const url = getBackendURL(`/api/accounts/${accountId}`)
      return axios.delete(url)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['store'])
      },
    }
  )
}

const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (data: any) => {
      const { accountId, values } = data
      const url = getBackendURL(`/api/accounts/${accountId}`)
      return axios.patch(url, { ...values })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['store'])
      },
    }
  )
}

export {
  useAccount,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount
};

