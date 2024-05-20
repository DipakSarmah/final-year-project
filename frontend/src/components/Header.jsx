import { Link } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'

function Header() {
  return (
    <div className="bg-white-600 py-5">
      <div className="mx-auto flex justify-between items-center px-12">
        <div className="text-3xl text-black font-bold tracking-tighter">
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <span>
              <img
                src="/spams-favicon-black.svg"
                alt=""
                height={35}
                width={35}
                style={{ marginRight: '5px' }}
              />
            </span>{' '}
            SPAMS
          </Link>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center font-bold px-3">
            <Link
              to="/sign-in"
              className="text-gray-500 font-sans border-[2px] border-black px-2 py-2 rounded-lg hover:bg-black hover:text-white "
            >
              Log In
            </Link>
          </div>
          <div className="flex items-center font-bold px-3">
            <button className="bg-black rounded-lg text-white font-mono px-4 py-2 ">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
