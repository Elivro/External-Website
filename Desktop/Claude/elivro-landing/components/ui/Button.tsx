'use client'

import React from 'react'

export interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', asChild = false, ...props }, ref) => {
    // Size variants
    const sizeClasses = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-7 py-3.5 text-[16px]',
      lg: 'px-9 py-4.5 text-lg',
    }

    // Variant styles
    const variantStyles = {
      primary: {
        wrapper: 'inline-flex rounded-full p-[1px] transition-shadow duration-300',
        wrapperStyle: {
          backgroundImage: 'linear-gradient(135deg, var(--grad-start), var(--grad-end))',
          boxShadow: 'var(--glow)',
        },
        inner: `inline-flex items-center gap-2 rounded-full ${sizeClasses[size]} text-white font-semibold transition-transform duration-300 will-change-transform group-hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60`,
        innerStyle: {
          backgroundColor: 'var(--btn-fill)',
        },
      },
      secondary: {
        wrapper: 'inline-flex rounded-full transition-all duration-300',
        wrapperStyle: {},
        inner: `inline-flex items-center gap-2 rounded-full ${sizeClasses[size]} text-white font-semibold border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60`,
        innerStyle: {},
      },
    }

    const styles = variantStyles[variant]

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (variant === 'primary') {
        e.currentTarget.style.boxShadow = 'var(--glow-hover)'
      }
      props.onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (variant === 'primary') {
        e.currentTarget.style.boxShadow = 'var(--glow)'
      }
      props.onMouseLeave?.(e)
    }

    return (
      <a
        ref={ref}
        className={`group ${styles.wrapper} ${className}`}
        style={styles.wrapperStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className={styles.inner} style={styles.innerStyle}>
          {children}
        </span>
      </a>
    )
  }
)

Button.displayName = 'Button'

export default Button
