import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { VDOM, Prism } from '~/Data'

const RE = /{([\d,-]+)}/

function calculateLinesToHighlight(meta?: string) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))

    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
      )
      return inRange
    }
  } else {
    return () => false
  }
}

type CodeProps = {
  codeString: string
  language: Language
  metastring?: string
}

export function code(props: CodeProps): VDOM {
  const { codeString, language, metastring } = props

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight
      {...defaultProps}
      Prism={Prism}
      code={codeString}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => {
        return (
          <div style={{ overflow: 'auto' }}>
            <pre className={className} style={{ position: 'relative' }}>
              {tokens.map((line, index) => {
                const { className } = getLineProps({
                  line,
                  key: index,
                  className: shouldHighlightLine(index) ? 'highlight-line' : '',
                })

                return (
                  <div key={index} className={className}>
                    <span className="number-line">{index + 1}</span>
                    {line.map((token, key) => {
                      const { className, children } = getTokenProps({
                        token,
                        key,
                      })

                      return (
                        <span key={key} className={className}>
                          {children}
                        </span>
                      )
                    })}
                  </div>
                )
              })}
            </pre>
          </div>
        )
      }}
    </Highlight>
  )
}

function preToCodeBlock(preProps) {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.props.mdxType === 'code'
  ) {
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props

    const matches = className.match(/language-(?<lang>.*)/)

    return {
      codeString: codeString.trim(),
      className,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : '',
      ...props,
    }
  }
}

type PreProps = {}

export function pre(props: PreProps): VDOM {
  const derivedProps = preToCodeBlock(props)

  if (derivedProps) {
    return React.createElement(code, derivedProps)
  }

  return <pre {...derivedProps} />
}
