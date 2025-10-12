import { useEffect } from 'react'
import Nav from './components/Nav'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
    const pathname = useLocation().pathname
    
    // scroll to top on route change
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [pathname])

    return (
      <div className='min-h-screen flex flex-col roboto-regular'>
        {/* navigation */}
        <Nav />
        {/* main content */}
        <ToastContainer />
        <main className='min-h-screen'>
          <Outlet />
        </main>
        {/* footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    )
  }

export default App
