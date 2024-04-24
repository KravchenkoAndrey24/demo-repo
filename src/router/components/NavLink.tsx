import React from 'react';
import { NavLink as BaseNavLink, NavLinkProps } from 'react-router-dom';
import { clsxm } from '../../lib/clsxm';

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps & { activeClassName?: string }>(
  ({ activeClassName, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          clsxm(
            'rounded p-2 px-4 transition-all hover:bg-gray-100',
            isActive ? clsxm(activeClassName, 'bg-gray-200 font-semibold hover:bg-gray-200') : ''
          )
        }
      />
    );
  }
);
