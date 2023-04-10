import Dropdown from "components/dropdown/Dropdown"
import RecievedMessages from "components/RecievedMessages"
import {  Link } from "react-router-dom"

export default function Navbar(props) {
    const { user, isAuth } = props.auth
    const { logout } = props
    return (
        <nav className="flex justify-between">
            <p>logo</p>
            {user &&
                <div>
                    <p>Hi {user.fullname}</p>
                </div>
            }
            <ul className="flex gap-6">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/services'>Services</Link>
                </li>
                <li>
                    <Link to='/faq'>FAQ</Link>
                </li>
                {!isAuth && <>
                    <li>
                        <Link to='/login'>Log in</Link>
                    </li>
                    <li>
                        <Link to='/register'>Sign up</Link>
                    </li>
                </>
                }
                {
                    isAuth && 
                    <>  
                        <Link to='/collaborations/me'>Recieved collaborations</Link>
                        <Dropdown/>
                        {user.messages && <RecievedMessages/>}
                        <button onClick={logout}>Logout</button>
                    </>
                }
            </ul>
        </nav>
    )
}
