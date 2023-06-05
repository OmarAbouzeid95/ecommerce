
import { useContext, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { loggedUser } from '../context'

function Profile() {

    const { user, setUser } = useContext(loggedUser)
    // state selecting active option
    const [active, setActive] = useState('account')
    const loc = useLocation()

    // styles
    const selected = {
        backgroundColor: 'lightgray'
    }

    // user orders
    const allOrders = user.orders.length > 0 ? user.orders.map(order => {
        return <div className="order-container">
                    {order}
                </div>})
        :
        <p>You don't have any orders, jump back in and <Link to='/'>start shopping</Link></p>


    return (
        <div className="profile-wrapper">
            <div className="profile-options">
                <button style={(active === 'account') ? selected : null} className="profile-option-btn" onClick={() => setActive('account')}>Account</button>
                <button style={(active === 'orders') ? selected : null} className="profile-option-btn" onClick={() => setActive('orders')}>Orders</button>
                <button style={(active === 'signOut') ? selected : null} className="profile-option-btn" onClick={() => {
                    setUser(null)
                    loc.pathname = '/signIn'
                }}>Sign out</button>

            </div>
            <div className="profile-active-option">
                <div className="user-info">
                    <h2>Account details</h2>
                    <form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id='email' disabled={true} type="email" value={user.email}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id='password' disabled={true} type="password" value={user.password}/>
                        </div>
                        <div>
                            <label htmlFor="firstName">First name</label>
                            <input id='firstName' disabled={true} type="text" value={user.firstName}/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last name</label>
                            <input id='lastName' disabled={true} type="text" value={user.lastName}/>
                        </div>
                    </form>
                </div>
                {(active === 'orders') && <div className="user-orders">
                    {allOrders}
                </div>}
            </div>
        </div>
    );
}

export default Profile;