import { Routes, Route, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks'
import Home from '../pages/home'
import NotFound from '../pages/404'
import Delivery from '../pages/delivery'
import TestProgress from '../pages/testProgress'
import DispatchDelivery from '../pages/dispatchDelivery'
import Cart from '../pages/cart'
import Login from '../pages/login'
import PayPal from '../pages/payment-paypal'
import Register from '../pages/register'
import Redirection from '../pages/redirect'
import Verify from '../pages/verify'
import Item from '../pages/item'
import ProductList from '../pages/seller'

const AnimatedRoutes = () => {
  useAuth()

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment" element={<PayPal />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/delivery/testProgress" element={<TestProgress />} />
        <Route path="/delivery/dispatchDelivery" element={<DispatchDelivery />} />
        <Route path="/redirect" element={<Redirection />} />
        <Route path="/verify/:code" element={<Verify />} />
        <Route path="/seller" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
