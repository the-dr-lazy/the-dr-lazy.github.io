import React from 'react'

import { Image } from '~/Component'
import { Author, defineDisplayName } from '~/Data'

type Props = { author: Author }

const classNames = {
  block: 'c-bio',
  elements: {
    avatar: 'c-bio__avatar',
    avatarInner: 'c-bio__avatar-inner',
    content: 'c-bio__content',
  },
}

export function component({ author }: Props) {
  return (
    <div className={classNames.block}>
      <div
        className={classNames.elements.avatar}
        data-a11y="false"
        aria-label="Author's bio"
      >
        <div className={classNames.elements.avatarInner}>
          <Image.round src={author.avatar.medium} />
        </div>
      </div>
      <p
        className={classNames.elements.content}
        dangerouslySetInnerHTML={{ __html: author.bio }}
      />
    </div>
  )
}

defineDisplayName('Component.Bio', { component })
