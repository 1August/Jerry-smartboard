import { ComponentProps, PropsWithChildren } from 'react'
import { cn } from '@/lib/utils.ts'
import styles from './Section.module.css'

export type SectionProps = ComponentProps<'section'>
export const Section = (props: PropsWithChildren<SectionProps>) => {
  const { children, className, ...otherProps } = props
  return (
    <section className={cn(className, styles.section)} {...otherProps}>
      {children}
    </section>
  )
}
