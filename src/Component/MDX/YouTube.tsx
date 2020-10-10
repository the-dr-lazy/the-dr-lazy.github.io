import React from 'react'
import YouTube from 'react-youtube'

type Props = { videoId: string }

export function component(props: Props) {
  const opts = React.useMemo(() => ({ width: '680', height: '382' }), [])

  return <YouTube {...props} containerClassName="c-mdx-youtube" opts={opts} />
}
