import { CacheConfig, RequestParameters, UploadableMap, Variables } from 'relay-runtime'
import store from '@/store'


async function fetchGraphQL(params: RequestParameters, variables: Variables, cacheConfig: CacheConfig,
                            uploadables: UploadableMap | null | undefined) {
  let body
  const headersInit = new Headers()
  headersInit.set('Accept', 'application/json')

  const operation = JSON.stringify({
    query: params.text,
    variables
  })

  headersInit.set('Content-Type', 'application/json')
  body = operation

  if (params) {
    headersInit.set('Authorization', `Bearer ${store.getState().user.token}`)
  }

  const requestVariables = {
    method: 'POST',
    headers: headersInit
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graphql`, {
    ...requestVariables,
    body: body
  })

  return response.json()
}

export default fetchGraphQL
