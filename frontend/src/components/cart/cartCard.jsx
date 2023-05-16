import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateItemQuantity } from '../../store/cartSlice'

// export default Cart

const CartCard = (props) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const handleRemoveItem = (_id) => {
    dispatch(removeItem(_id))
  }

  const handleQuantityChange = (_id, value) => {
    const item = cartItems.find((item) => item._id === _id)

    // Prevent negative quantity
    if (value < 1) return

    const newQuantity = value > item.quantity ? item.quantity + 1 : item.quantity - 1
    dispatch(updateItemQuantity({ _id, quantity: newQuantity }))
  }

  // Calculate total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? subtotal * 0.05 : 0

  return (
    <>
      {/* component */}
      {/* Create By Joker Banny */}
      <style
        dangerouslySetInnerHTML={{
          __html: '\n    @layer utilities {\n    input[type="number"]::-webkit-inner-spin-button,\n    input[type="number"]::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n    }\n  }\n',
        }}
      />
      <div className="h-screen bg-gray-100 pt-10">
        <h1 className="mb-10 text-center text-3xl font-bold">CART ITEMS</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items */}
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => (
              <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={item.selectedFile} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">{item.category}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l select-none bg-green-100 py-1 px-3.5 duration-100 hover:bg-green-800 hover:text-blue-50" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                        -
                      </span>
                      <input disabled className="h-8 w-10  bg-gray-100 text-center text-xs outline-none" type="number" value={item.quantity} min={1} onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))} />
                      <span className="cursor-pointer select-none rounded-r bg-green-100 py-1 px-3 duration-100 hover:bg-green-800 hover:text-blue-50" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-md ">LKR {item.price}</p>
                      <button onClick={() => handleRemoveItem(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeW_idth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">LKR {subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">LKR {shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">LKR {subtotal + shipping}</p>
              </div>
            </div>
            <Link to={`/payments?subtotal=${subtotal + shipping}`}>
              <button className="mt-6 w-full rounded-md bg-green-800 py-1.5 font-medium text-blue-50 hover:bg-green-600">Check out</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartCard
