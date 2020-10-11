import React from 'react'
import cc, { Class } from 'classcat'

import { VDOM } from '~/Data'

type Props = JSX.IntrinsicElements['svg']

const classNames = {
    block: 'c-icon',
    elements: {
        path: 'c-icon__path',
    },
}

function mkIconClassName(xs: Class | undefined) {
    return cc([classNames.block, xs])
}

export function twitter({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                className={classNames.elements.path}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0658 2.34438C14.7013 1.96349 15.1892 1.3604 15.419 0.641811C14.8244 0.994439 14.1658 1.25056 13.4648 1.3886C12.9034 0.7905 12.1036 0.416748 11.2185 0.416748C9.51888 0.416748 8.14096 1.79461 8.14096 3.49411C8.14096 3.7353 8.16822 3.97019 8.22068 4.19542C5.66301 4.06708 3.39543 2.84191 1.8776 0.980064C1.6127 1.43458 1.46094 1.96322 1.46094 2.52719C1.46094 3.59485 2.00428 4.5368 2.83003 5.08865C2.32553 5.07268 1.85104 4.93425 1.43608 4.70376C1.43586 4.71659 1.43586 4.72949 1.43586 4.74244C1.43586 6.23349 2.49666 7.47732 3.90448 7.75999C3.64622 7.83033 3.37436 7.86792 3.09366 7.86792C2.89537 7.86792 2.70257 7.84866 2.51471 7.81272C2.90629 9.03537 4.0428 9.92509 5.38945 9.94994C4.33623 10.7753 3.00928 11.2673 1.56749 11.2673C1.31911 11.2673 1.07413 11.2528 0.833374 11.2243C2.19527 12.0975 3.81291 12.6069 5.55081 12.6069C11.2113 12.6069 14.3067 7.91763 14.3067 3.85096C14.3067 3.71753 14.3037 3.5848 14.2978 3.45285C14.899 3.01896 15.4208 2.47694 15.8334 1.8598C15.2815 2.10456 14.6884 2.26998 14.0658 2.34438Z"
            />
        </svg>
    )
}

export function github({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0C3.1325 0 0 3.21173 0 7.17706C0 10.3529 2.00375 13.0353 4.78625 13.9863C5.13625 14.0491 5.2675 13.8338 5.2675 13.6454C5.2675 13.4749 5.25875 12.9097 5.25875 12.3087C3.5 12.6406 3.045 11.8691 2.905 11.4653C2.82625 11.259 2.485 10.622 2.1875 10.4516C1.9425 10.317 1.5925 9.98508 2.17875 9.97611C2.73 9.96714 3.12375 10.4964 3.255 10.7118C3.885 11.7973 4.89125 11.4923 5.29375 11.3039C5.355 10.8374 5.53875 10.5234 5.74 10.3439C4.1825 10.1645 2.555 9.54549 2.555 6.80026C2.555 6.01976 2.82625 5.37382 3.2725 4.87143C3.2025 4.692 2.9575 3.95635 3.3425 2.96951C3.3425 2.96951 3.92875 2.78111 5.2675 3.70516C5.8275 3.54367 6.4225 3.46293 7.0175 3.46293C7.6125 3.46293 8.2075 3.54367 8.7675 3.70516C10.1063 2.77214 10.6925 2.96951 10.6925 2.96951C11.0775 3.95635 10.8325 4.692 10.7625 4.87143C11.2087 5.37382 11.48 6.01079 11.48 6.80026C11.48 9.55446 9.84375 10.1645 8.28625 10.3439C8.54 10.5682 8.75875 10.9988 8.75875 11.6717C8.75875 12.6316 8.75 13.4032 8.75 13.6454C8.75 13.8338 8.88125 14.0581 9.23125 13.9863C11.9963 13.0353 14 10.3439 14 7.17706C14 3.21173 10.8675 0 7 0Z"
                className={classNames.elements.path}
            />
        </svg>
    )
}

export function tiles({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                className={classNames.elements.path}
                d="M4.33337 13.8424H12.0371V5.4165H4.33337V13.8424ZM4.33337 20.5832H12.0371V15.5276H4.33337V20.5832ZM13.963 20.5832H21.6667V12.1572H13.963V20.5832ZM13.963 5.4165V10.4721H21.6667V5.4165H13.963Z"
            />
        </svg>
    )
}

export function rows({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                className={classNames.elements.path}
                d="M4.33331 15.1665H8.41174V10.8332H4.33331V15.1665ZM4.33331 20.5832H8.41174V16.2498H4.33331V20.5832ZM4.33331 9.74984H8.41174V5.4165H4.33331V9.74984ZM9.43135 15.1665H21.6666V10.8332H9.43135V15.1665ZM9.43135 20.5832H21.6666V16.2498H9.43135V20.5832ZM9.43135 5.4165V9.74984H21.6666V5.4165H9.43135Z"
            />
        </svg>
    )
}

export function ex({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0.188477H24V24.2789H0V0.188477Z"
                stroke="black"
                strokeOpacity="0.01"
                strokeWidth="0"
            />
            <path
                className={classNames.elements.path}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 6.58848L17.6 5.18848L12 10.7885L6.4 5.18848L5 6.58848L10.6 12.1885L5 17.7885L6.4 19.1885L12 13.5885L17.6 19.1885L19 17.7885L13.4 12.1885L19 6.58848Z"
            />
        </svg>
    )
}

export function copy({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="15"
            height="19"
            viewBox="0 0 15 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                className={classNames.elements.path}
                d="M11.0475 0.905273H1.67197C0.812542 0.905273 0.109375 1.60844 0.109375 2.46787V13.406H1.67197V2.46787H11.0475V0.905273ZM13.3914 4.03046H4.79716C3.93773 4.03046 3.23456 4.73363 3.23456 5.59306V16.5312C3.23456 17.3906 3.93773 18.0938 4.79716 18.0938H13.3914C14.2509 18.0938 14.954 17.3906 14.954 16.5312V5.59306C14.954 4.73363 14.2509 4.03046 13.3914 4.03046ZM13.3914 16.5312H4.79716V5.59306H13.3914V16.5312Z"
            />
        </svg>
    )
}

export function copied({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="15"
            height="19"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                className={classNames.elements.path}
                d="M5 3.33333H3.33333V5H5V3.33333ZM5 6.66667H3.33333V8.33333H5V6.66667ZM5 0C4.075 0 3.33333 0.75 3.33333 1.66667H5V0ZM8.33333 10H6.66667V11.6667H8.33333V10ZM13.3333 0V1.66667H15C15 0.75 14.25 0 13.3333 0ZM8.33333 0H6.66667V1.66667H8.33333V0ZM5 11.6667V10H3.33333C3.33333 10.9167 4.075 11.6667 5 11.6667ZM13.3333 8.33333H15V6.66667H13.3333V8.33333ZM13.3333 5H15V3.33333H13.3333V5ZM13.3333 11.6667C14.25 11.6667 15 10.9167 15 10H13.3333V11.6667ZM1.66667 3.33333H0V13.3333C0 14.25 0.741667 15 1.66667 15H11.6667V13.3333H1.66667V3.33333ZM10 1.66667H11.6667V0H10V1.66667ZM10 11.6667H11.6667V10H10V11.6667Z"
            />
        </svg>
    )
}

export function chevronLeft({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path className={classNames.elements.path} d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z" />
        </svg>
    )
}

export function link({ className, ...props }: Props): VDOM {
    return (
        <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mkIconClassName(className)}
            {...props}
        >
            <path
                className={classNames.elements.path}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 5C2 3.34328 3.34328 2 5 2H14C15.6567 2 17 3.34328 17 5V9C17 10.6567 15.6567 12 14 12H10C9.44771 12 9 12.4477 9 13C9 13.5523 9.44771 14 10 14H14C16.7613 14 19 11.7613 19 9V5C19 2.23872 16.7613 0 14 0H5C2.23872 0 0 2.23872 0 5V9C0 10.4938 0.656313 11.8361 1.6935 12.7509C2.10768 13.1163 2.73961 13.0767 3.10494 12.6625C3.47028 12.2483 3.43068 11.6164 3.0165 11.2511C2.39169 10.6999 2 9.89621 2 9V5ZM7 11C7 9.34328 8.34328 8 10 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H10C7.23872 6 5 8.23872 5 11V15C5 17.7613 7.23872 20 10 20H19C21.7613 20 24 17.7613 24 15V11C24 9.50621 23.3437 8.16393 22.3065 7.24906C21.8923 6.88372 21.2604 6.92332 20.8951 7.3375C20.5297 7.75168 20.5693 8.38361 20.9835 8.74894C21.6083 9.30007 22 10.1038 22 11V15C22 16.6567 20.6567 18 19 18H10C8.34328 18 7 16.6567 7 15V11Z"
            />
        </svg>
    )
}
