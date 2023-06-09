import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import { Loader } from '../common'
import Footer from './footer'
import Header from './header/Header'
// import Header from './navbar'
// import Head from './header/Head'

const Layout = ({ children, hideHeader, hideFooter }) => {
  return (
    <motion.main className=" font-inter overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.3 }}>
      {!hideHeader && <Header />}
      <div className="w-screen min-h-screen relative z-[5]">{children}</div>
      {!hideFooter && <Footer />}
      <ToastContainer />
      <Loader />
    </motion.main>
  )
}

export default Layout
