import React from 'react'

import { defineDisplayName } from '~/Data'

export function component() {
    return (
        <svg className="c-navigation-footer-gradient" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="c-navigation-footer-gradient" x1="0" y1="0" x2="0" y2="100%">
                    <stop className="c-navigation-footer-gradient__top" offset="0%" />
                    <stop className="c-navigation-footer-gradient__bottom" offset="100%" />
                </linearGradient>
            </defs>
            <rect
                className="c-navigation-footer-gradient__rect"
                width="100"
                height="100"
                style={{ fill: 'url(#c-navigation-footer-gradient)' }}
            />
        </svg>
    )
}

defineDisplayName('Components.Navigation.Footer.Gradient', { component })
