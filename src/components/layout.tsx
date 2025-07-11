
import type { PropsWithChildren } from 'react'
import Header from "./header"

const Layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>

     
          <Header/>
    
      <main className='min-h-screen container mx-auto px-4 py-8'>{children}</main>
      
      

      <footer className='bg-muted text-center py-12 border-t  backdrop-blur-lg supports-[backdrop-filter]:bg-background/65'>
        <div className='container mx-auto px-4'>
        <p>
          Made with ❤️ by Jibin
        </p>
      </div>
      </footer>
      </div>
  )
}

export default Layout