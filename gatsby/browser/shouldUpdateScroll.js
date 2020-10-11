/* eslint-disable */

export default ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {
    const currentPosition = getSavedScrollPosition(routerProps.location)
    // const topOfPage = { top: 0, left: 0, behavior: 'smooth' }

    console.log(routerProps)
    if (routerProps.location.action === 'POP' && currentPosition) {
        window.scrollTo(...currentPosition)
    } else {
        window.scrollTo(0, 0)
    }

    // Handling previous path into local storage for "Back" arrow button
    if (prevRouterProps) {
        window.localStorage.setItem('previousPath', prevRouterProps.location.pathname)
    }

    return false
}
