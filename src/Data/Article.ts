import * as GatsbyImage from 'gatsby-image'

// import { Author } from '~/Data'

export type Article = {
  slug: string
  author: string
  // authors: Author[]
  excerpt: string
  title: string
  body: string
  id: string
  secret: boolean
  subscription: boolean
  canonical_url: string | null
  hero: {
    full: GatsbyImage.FluidObject
    narrow: GatsbyImage.FluidObject
    regular: GatsbyImage.FluidObject
    seo: { src: string }
  }
  timeToRead: number
  date: string
  dateForSEO: string
}
