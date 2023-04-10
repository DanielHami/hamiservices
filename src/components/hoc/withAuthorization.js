import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'


const withAuthorization = Component => {

    class WithAuthorization extends React.Component {


        render() {
            const { auth } = this.props
            return auth.isAuth ? <Component {...this.props}/> : <Navigate to='/login' />
        }
    }
    return connect(({ auth }) => ({ auth }))(WithAuthorization)
}

export default withAuthorization