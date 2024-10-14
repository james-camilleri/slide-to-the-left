import type { PageLoad } from './$types'

export const load: PageLoad = ({ params, url }) => {
  return {
    presentation: params.presentation,
    slideIndex: Number(params.index),
    secret: url.searchParams.get('secret'),
  }
}
