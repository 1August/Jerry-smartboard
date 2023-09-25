import { ComponentProps, PropsWithChildren } from 'react'
import { cn } from '@/lib/utils.ts'

export type ContainerProps = ComponentProps<'div'>
export const Container = (props: PropsWithChildren<ContainerProps>) => {
  const { children, className, ...otherProps } = props
  return (
    <div className={cn(className, 'px-6 md:px-12 lg:px-24')} {...otherProps}>
      {children}
    </div>
  )
}
