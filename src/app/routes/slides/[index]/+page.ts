import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
  return { slideIndex: Number(params.index) }
}
