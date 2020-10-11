import React from 'react'
import YouTube from 'react-youtube'
import cc from 'classcat'

import { Loader, Couplet } from '~/Component'

type Props = { videoId: string; title: string }

const classNames = {
  block: 'c-mdx-youtube',
  elements: {
    iframe: 'c-mdx-youtube__iframe',
    loader: 'c-mdx-youtube__loader',
  },
  modifiers: {
    ready: '-ready',
  },
}

const censorshipDetectionTimeout = 8000

export function component({ title, ...props }: Props) {
  const [isReady, setIsReady] = React.useState(false)
  const [isCensored, setIsCensored] = React.useState(false)
  const opts = React.useMemo(() => ({ width: '100%', height: '100%' }), [])
  const handleReady = React.useCallback(() => setIsReady(true), [])

  React.useEffect(() => {
    const id = setTimeout(() => setIsCensored(true), censorshipDetectionTimeout)

    return () => clearTimeout(id)
  }, [])

  const blockClassName = cc([
    classNames.block,
    isReady && classNames.modifiers.ready,
  ])

  // TODO: Handle censorship

  return (
    <div className={blockClassName}>
      <YouTube
        {...props}
        containerClassName={classNames.elements.iframe}
        opts={opts}
        onReady={handleReady}
      />
      {!isReady && <Loader.component className={classNames.elements.loader} />}
    </div>
  )
}
