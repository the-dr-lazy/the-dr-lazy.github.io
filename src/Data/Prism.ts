import Prism from 'prismjs'

declare global {
  interface Window {
    Prism: typeof Prism
  }
}

window.Prism = Prism

require('prismjs/components/prism-haskell')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-js-extras')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-tsx')
require('prismjs/components/prism-sql')

require('prismjs/components/prism-latex')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-markup')
require('prismjs/components/prism-css')
require('prismjs/components/prism-css-extras')
require('prismjs/components/prism-scss')

require('prismjs/components/prism-git')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-json')
require('prismjs/components/prism-yaml')

require('prismjs/components/prism-nix')
require('prismjs/components/prism-docker')

// Prism.languages.insertBefore('haskell', 'comment', {
//   pragma: /^(\{\-\#\s+[A-Z_]+\s+[A-z0-9-_]+\s+\#\-\})$/m,
// })
//
Prism.languages.haskell = Prism.languages.extend('haskell', {
  comment: [
    {
      pattern: /(^\{\-\#\s+[A-Z_]+\s+[A-z0-9-_]+\s+\#\-\}$)/m,
      inside: {
        pragma: {
          pattern: /(^\{\-\#\s+)(?:[A-Z_]+)/m,
          lookbehind: true,
        },
      },
    },
    {
      pattern: /(^|[^-!$%*+=?&@|~.:<>^\\\/])(?:--[^-!$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
      lookbehind: true,
    },
  ],
})

export { Prism }
