import { Link, useLocation } from 'react-router-dom'


interface FilterLinkProps {
    filter: string
    children: React.ReactNode
}

export const FilterLink = ({ filter, children }: FilterLinkProps ) => {
    const { pathname } = useLocation()
    return (
        <li>
            <Link
                data-cy={`${filter}-filter`}
                className={pathname === `/${filter}` ? `select` : ""}
                to={`/${filter}`}
            >
                {children}
            </Link>
        </li>
    )
}