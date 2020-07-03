import React from 'react'

import { Author, VDOM, defineDisplayName } from '~/Data'
import { Image } from '~/Component'

type Props = { author: Author }

const classNames = {
  block: 'c-article-author',
  elements: {
    avatar: 'c-article-author__avatar',
    name: 'c-article-author__name',
  },
}

export function component({ author }: Props): VDOM {
  return (
    <div className={classNames.block}>
      <div className={classNames.elements.avatar}>
        <Image.round src={author.avatar.small} />
      </div>
      <strong className={classNames.elements.name}>{author.name}</strong>
      <span className="o-hide-until-phablet">,&nbsp;</span>
    </div>
  )
}

defineDisplayName('Component.Template.Article.Author', { component })
