import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
  return {
    presentation: params.presentation,
    slideIndex: Number(params.index),
  }
}
