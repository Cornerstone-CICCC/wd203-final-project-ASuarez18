import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        Footer
      </footer>
    </div>
  )
}

export default Layout