import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import NotificationDropDown from '../../common/notificationDropDown'

//Notificaiton import
import { getNotificationById, updateNotifications } from '../../../services/notifications'

import { logout } from '../../../services'

const Navbar = ({ name, email }) => {
  const navigate = useNavigate()

  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search')
    search.classList.toggle('pb-[5rem]')
    search.classList.toggle('active', window.scrollY > 36)
  })

  // Toogle Menu
  const [userMenue, setUserMenue] = useState(false)

  const handleClick = () => {
    setUserMenue(!userMenue)

    notificationMenu && setNotificationMenu(!notificationMenu)
  }

  const cartItems = useSelector((state) => state.cart.items)

  // Calculate total number of items in the cart
  const totalItems = cartItems.length

  // navLinks

  const [notificationMenu, setNotificationMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isRead, setIsRead] = useState()

  //notification count
  var count = 0
  notifications.map((notification) => {
    if (notification.isRead == false) {
      count++
    }
    console.log(count)
  })
  const notificationCount = count

  const id = localStorage.getItem('id')

  // fetching notifications
  const fetchData = async () => {
    try {
      if (id.length > 10) {
        const response = await getNotificationById(id, true)
        setNotifications(response.data)
        setIsRead(response.data.isRead)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 10000)
    // fetchData()

    return () => clearInterval(interval)
  }, [])

  const currentTime = new Date().toISOString()
  const handleNotificaiton = async (e) => {
    const updatedNotifications = []
    for (const notification of notifications) {
      const data = { isRead: true }

      const response = await updateNotifications(notification._id, data, false)
      updatedNotifications.push(response.data)
    }
    setNotifications(updatedNotifications)
    setNotificationMenu(!notificationMenu)
    setUserMenue(false)
  }

  console.log('isOpen:', notificationMenu)
  console.log('notifications:', notifications)
  console.log('is array?', Array.isArray(notifications.data))

  const navLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Products',
      path: '/products',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Contact',
      path: '/delivery',
    },
    {
      title: 'Seller',
      path: '/seller',
    },
  ]

  return (
    <>
      <section className="search ">
        <div className="container c_flex">


          <div className="navlink">
            <ul className="link f_flex capitalize ">
              {navLinks.map((link, index) => (
                <li className="mr-10">
                  <Link to={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span>Category</span>
          </div>

          <div className="icon f_flex width">
            <div className="cart">
              <button onClick={handleClick}>
                <i className="fa  fa-user icon-circle"></i>
              </button>
            </div>
            <div className="cart">
              <Link to="/cart">
                <p className={`${totalItems == 0 ? 'hidden' : ''} absolute right-0 top-[-4px] bg-red-600 text-white rounded-full px-1.5 pt-0.5 text-xs`}>{totalItems}</p>
                <i className="fa fa-shopping-bag icon-circle icon-circle"></i>
              </Link>
            </div>
            <div className="cart">
              <button onClick={handleNotificaiton}>
                <i className="fa fa-bell icon-circle icon-circle" />
              </button>
            </div>
          </div>
          {/* mobile nav */}
          <div className={`50 ${userMenue ? '' : 'hidden'}  absolute right-40  top-28 z-30 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`}>
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{name ? name : 'Guest'}</span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{email ? email : 'your@email.com'}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  My Orders
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Earnings
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout(true)
                    navigate('/login')
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          {/*Notification*/}
          <div className="relative">
            <button onClick={() => setNotificationMenu(!notificationMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
              {notificationCount > 0 && <span className="absolute -top-3 -right-0 px-2 rounded-full bg-red-500 text-white text-xs">{notificationCount}</span>}
            </button>
            <div className={`50 ${notificationMenu ? '' : 'hidden'}  absolute right-5  top-25 z-30 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`} style={{ maxHeight: '150px', overflowY: 'scroll' }}>
              <div className="px-4 py-3">
                {notifications.slice().reverse().map((notification) => {
                  const time = new Date(notification.created_at).toLocaleTimeString()
                  return (
                    <div key={notification._id}>
                      <span className="block text-sm text-gray-900 dark:text-white">{notification.notification_title}</span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{notification.message}</span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400" style={{ textAlign: 'right' }}>
                        {time}
                      </span>
                      <hr />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Navbar
