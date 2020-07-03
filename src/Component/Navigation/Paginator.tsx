import React from 'react'
import * as A from 'fp-ts/lib/ReadonlyArray'
import * as O from 'fp-ts/lib/Option'
import { constant, flow } from 'fp-ts/lib/function'
import { Option, none, some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import * as Translation from '~/Translation'
import { Spacer } from '~/Component'
import {
  VDOM,
  arrayEmptyUnless,
  defineDisplayName,
  getPagePath,
  monoidVDOM,
} from '~/Data'

const classNames = {
  block: 'c-paginator',
  elements: {
    mobileReference: 'c-paginator__mobile-reference',
    previous: 'c-paginator__previous',
    next: 'c-paginator__next',
    page: 'c-paginator__page',
  },
}

function mkPageNumberButton(basePath: string) {
  type Spec = { page: number; isActive: boolean }

  return ({ page, isActive }: Spec) => (
    <Link
      key={page}
      to={getPagePath(basePath, page)}
      style={{ opacity: isActive ? 1 : 0.3 }}
      className={classNames.elements.page}
    >
      {page}
    </Link>
  )
}

function mkPaginatorStructure(
  total: number,
  current: number,
  maxPages: number,
): Option<number>[] {
  const d = current === 1 || current === total ? 1 : 2
  const lowest = Math.max(2, current - maxPages + d)
  const highest = Math.min(total - 1, current + maxPages - d)

  const middleStructure = Array.prototype.concat(
    arrayEmptyUnless(current > 3, [none]),
    A.range(lowest, highest).map(some),
    arrayEmptyUnless(current < total - 2, [none]),
  )

  return [some(1), ...middleStructure, some(total)]
}

export type Props = {
  total: number
  current: number
  basePath: string
  maxPages: number
}

export function component(props: Props): VDOM {
  const { total, current, basePath, maxPages } = props

  const translation = Translation.ask()

  // There is no paginator for single page blog
  if (total <= 1) return monoidVDOM.empty

  const hasNextPage = current < total
  const hasPreviousPage = current > 1
  const previousPagePath = getPagePath(basePath, current - 1)
  const nextPagePath = getPagePath(basePath, current + 1)

  const structure = mkPaginatorStructure(total, current, maxPages)

  const pageNumberButtons = pipe(
    structure,
    A.map(
      flow(
        O.map(page => ({ page, isActive: page === current })),
        O.map(mkPageNumberButton(basePath)),
        O.getOrElse(constant(<Spacer.component key="spacer" />)),
      ),
    ),
  )

  return (
    <>
      <Helmet>
        {hasPreviousPage && <link rel="prev" href={previousPagePath} />}
        {hasNextPage && <link rel="next" href={nextPagePath} />}
      </Helmet>
      <nav className={classNames.block}>
        {hasPreviousPage && (
          <Link className={classNames.elements.previous} to={previousPagePath}>
            {translation.paginator.previous}
          </Link>
        )}
        {pageNumberButtons}
        <span
          className={classNames.elements.mobileReference}
          aria-hidden="true"
        >
          <em>{current}</em>&nbsp;{translation.paginator.of} {total}
        </span>
        {hasNextPage && (
          <Link className={classNames.elements.next} to={nextPagePath}>
            {translation.paginator.next}
          </Link>
        )}
      </nav>
    </>
  )
}
component.defaultProps = {
  maxPages: 3,
}

defineDisplayName('Component.Navigation.Paginator', { component })
