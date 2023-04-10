import { Navbar } from "flowbite-react"
import { Dropdown } from "flowbite-react"
import { Avatar } from "flowbite-react"
import { Link } from "react-router-dom"
import RecievedMessages from "components/RecievedMessages"


const Navi = props => {
  const { user, isAuth, messages } = props.auth
  const { logout } = props
  const total = messages.filter(m => !m.isRead).length

 
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className=""
    >
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!isAuth && <ul className="flex gap-6">
          <li>
            <Link to='/login'>Log in</Link>
          </li>
          <li>
            <Link to='/register'>Sign up</Link>
          </li>
        </ul>
        }

        {isAuth &&
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img={`${user.avatar}`} rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-lg font-bold">
                {user.fullname}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Link to="/services/new">
              <Dropdown.Item>
                Create services
              </Dropdown.Item>
            </Link>
            <Link to="/services/my">
              <Dropdown.Item>
                Your services
              </Dropdown.Item>
            </Link>
            <Link to="/services/sent">
              <Dropdown.Item>
                Sent offers
              </Dropdown.Item>
            </Link>
            <Link to="/services/recieved">
              <Dropdown.Item>
                Recieved offers
              </Dropdown.Item>
            </Link>
            <Link to='/collaborations/me'>
              <Dropdown.Item>
                Recieved collaborations
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            {isAuth &&
              <Dropdown.Item>
                <button onClick={logout}>Logout</button>
              </Dropdown.Item>
            }
          </Dropdown>
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="">
        <Link to="/">Home</Link>
        <Link to="/profile">About</Link>
        <Link to="/navbars">Contact</Link>
        {isAuth &&
          <Dropdown
            label={<p>Message<span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {total}
      </span></p>}
            arrowIcon={false}
            inline={true}
          >
            <div className="w-3/12">
             </div>
        {
          messages && 
          <Dropdown.Item>
            <RecievedMessages/>
          </Dropdown.Item>
         }
      </Dropdown>
       }
      </Navbar.Collapse>
    </Navbar>

  )
}

export default Navi
