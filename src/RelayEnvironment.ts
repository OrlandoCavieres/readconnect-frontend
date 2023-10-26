import {
  CacheConfig,
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  UploadableMap,
  Variables
} from 'relay-runtime'
import fetchGraphQL from './fetchGraphQL'
import store from '@/store'
import { removeToken } from '@/store/slices/UserInformation'

async function fetchRelay(params: RequestParameters, variables: Variables, cacheConfig: CacheConfig,
                          uploadables: UploadableMap | null | undefined) {
  const response = await fetchGraphQL(params, variables, cacheConfig, uploadables)

  if (response.errors) {
    if (response.errors[0].message.includes('No estás autentificado')) {
      store.dispatch(removeToken())
    }
  }

  return response
}


const env = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
})

export default env
