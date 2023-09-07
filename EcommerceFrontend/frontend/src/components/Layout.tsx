import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}
  
const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div>
        <Header />
        <main>{children}</main>
        {showFooter && <Footer />}
    </div>
  )
}

export default Layout