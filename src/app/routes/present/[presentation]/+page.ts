import type { PageLoad } from './$types'

export const load: PageLoad = ({ params, url }) => {
  return { presentation: params.presentation, secret: url.searchParams.get('secret') }
}
