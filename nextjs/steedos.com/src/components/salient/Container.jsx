import clsx from 'clsx'





export function Container({ className, ...props }) {
  return (
    // margin: auto || max-width: 1280px  ||  padding-left padding-right
    <div className={clsx('mx-auto max-w-7xl   px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
