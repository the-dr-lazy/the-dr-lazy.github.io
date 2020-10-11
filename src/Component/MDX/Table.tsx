import React from 'react'
import cc from 'classcat'

type TableProps = JSX.IntrinsicElements['table']

export function table({ className, ...props }: TableProps): VDOM {
    return (
        <div className="c-mdx-table">
            <table {...props} className={cc(['c-mdx-table__table', className])} />
        </div>
    )
}

type TheadProps = JSX.IntrinsicElements['thead']

export function thead({ className, ...props }: TheadProps): VDOM {
    return <thead {...props} className={cc(['c-mdx-thead', className])} />
}

type ThProps = JSX.IntrinsicElements['th']

export function th({ className, ...props }: ThProps): VDOM {
    return <th {...props} className={cc(['c-mdx-th', className])} />
}

type TdProps = JSX.IntrinsicElements['td']

export function td({ className, ...props }: TdProps): VDOM {
    return <td {...props} className={cc(['c-mdx-td', className])} />
}
