import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../store/cartSlice'

import Button from './button'
import { useAuth } from '../../hooks'

const ItemCard = ({ item }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (item) => {
    dispatch(addItem(item))
  }

  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token')

  return (
    <div key={item._id} className="  flex w-full max-w-xs flex-col overflow-hidden h-[25rem] rounded-lg border border-gray-100 bg-white shadow-md">
      <Link className="relative mx-3 mt-3 flex  overflow-hidden rounded-xl" to={`/item/${item._id}`}>
        <img className="object-cover w-full" src={item.selectedFile} alt="product image" />
        {/* OFF LIMIT */}
        {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/item/${item._id}`}>
          <h5 className="text-md tracking-tight text-slate-900">{item.title}</h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between ">
          <p>
            <span className="text-lg font-bold text-slate-900">LKR {item.price}</span>
            {/* {OFFER} */}
            {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
          </p>
          <div className="flex items-center">
            {item.avgRating !== undefined && item.avgRating !== 0 &&
              Array(item.avgRating)
                .fill()
                .map((_, index) => (
                  <svg key={index} aria-hidden="true" className="h-5 w-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            {item.avgRating % 1 >= 0.5 && item.avgRating !== 0 && (
              <svg key={index} aria-hidden="true" className="h-5 w-3 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{item.avgRating}</span>
          </div>
        </div>
        <Button
          onClick={() => {
            token ? handleAddToCart(item) : alert('Please login to add items to cart')
          }}
          className="flex items-center rounded-md px-5 py-2.5 text-center text-sm font-medium  focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to cart
        </Button>
      </div>
    </div>
  )
}

export default ItemCard
