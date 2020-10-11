import * as GatsbyImage from 'gatsby-image'

export type Author = {
    featured?: boolean
    name: string
    slug: string
    bio: string
    avatar: {
        image: GatsbyImage.FluidObject
        full: GatsbyImage.FluidObject
        medium: GatsbyImage.FluidObject
        small: GatsbyImage.FluidObject
    }
}

export function isFeaturedAuthor(author: Author) {
    return !!author.featured
}
