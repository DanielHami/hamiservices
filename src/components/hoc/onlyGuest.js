import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'


const onlyGuest = Component => {

    class OnlyGuest extends React.Component {


        render() {
            const { auth } = this.props
            console.log(auth.isAuth)
            return auth.isAuth ? <Navigate to='/' /> : <Component {...this.props}/> 
        }
    }
    return connect(({ auth }) => ({ auth }))(OnlyGuest)
}

export default onlyGuest