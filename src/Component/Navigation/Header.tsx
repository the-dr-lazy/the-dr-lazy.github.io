import React from 'react'
import cc from 'classcat'
import { Link, navigate } from 'gatsby'

import * as Metadata from '~/Metadata'
import { A11y, Button, Icon, Section } from '~/Component'
import { Theme, VDOM, defineDisplayName } from '~/Data'

type Props = {
    showBackButton: boolean
    theme: Theme
    showCopyURLMessage: boolean
}

const classNames = {
    elements: {
        nav: 'c-header__nav',
        homeLink: 'c-header__home-link',
        backArrowContainer: 'c-header__back-arrow-container',
        backArrow: 'c-header__back-arrow',
        controls: 'c-header__controls',
        control: 'c-header__control',
        backButtonIcon: 'c-header__back-button-icon',
    },
    modifiers: {
        back: '-back',
    },
}

export function component({ showBackButton, theme, showCopyURLMessage }: Props): VDOM {
    const metadata = Metadata.ask()

    const homeLinkClassName = cc([classNames.elements.homeLink, showBackButton && classNames.modifiers.back])

    // const [showBackButton, setShowBackArrow] = useState<boolean>(false)
    // const [previousPath, setPreviousPath] = useState<string>('/')
    // const { sitePlugin } = useStaticQuery(siteQuery)

    // const [colorMode] = useColorMode()
    // const fill = colorMode === 'dark' ? '#fff' : '#000'
    // const { rootPath, basePath } = sitePlugin.pluginOptions

    // useEffect(() => {
    //   const { width } = getWindowDimensions()
    //   const phablet = getBreakpointFromTheme('phablet')
    //
    //   const prev = localStorage.getItem('previousPath')
    //   const previousPathWasHomepage =
    //     prev === (rootPath || basePath) || (prev && prev.includes('/page/'))
    //   const isNotPaginated = !location.pathname.includes('/page/')
    //
    //   setShowBackArrow(
    //     previousPathWasHomepage && isNotPaginated && width <= phablet,
    //   )
    //   setPreviousPath(prev)
    // }, [])
    //

    return (
        <Section.component>
            <div className={classNames.elements.nav}>
                <Link
                    className={homeLinkClassName}
                    to={metadata.basePath}
                    data-a11y="false"
                    title="Navigate back to the homepage"
                    aria-label="Navigate back to the homepage"
                >
                    {showBackButton && (
                        <div className={classNames.elements.backArrowContainer}>
                            <Icon.chevronLeft className={classNames.elements.backArrow} />
                        </div>
                    )}
                    <A11y.Hidden.component>Navigate back to the homepage</A11y.Hidden.component>
                </Link>
                <div className={classNames.elements.controls}>
                    {showBackButton ? (
                        <button
                            onClick={() => navigate(previousPath)}
                            title="Navigate back to the homepage"
                            aria-label="Navigate back to the homepage"
                        >
                            <Icon.ex className={classNames.elements.backButtonIcon} />
                        </button>
                    ) : (
                        <>
                            <Button.SharePage.component showCopyURLMessage={showCopyURLMessage} className={classNames.elements.control} />
                            <Button.ThemeToggle.component theme={theme} className={classNames.elements.control} />
                        </>
                    )}
                </div>
            </div>
        </Section.component>
    )
}

defineDisplayName('Component.Navigation.Header', { component })
