import { fetchUserServices } from "actions"
import withAuthorization from "components/hoc/withAuthorization"
import ServiceItem from "components/services/ServiceItem"
import React from "react"

class UserServices extends React.Component {
   
    componentDidMount() {
        const {auth: {user}, dispatch} = this.props
        dispatch(fetchUserServices(user.uid))
    }

    render() {
        const {services} = this.props.auth

    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold mb-10  ">Your services</h1>
                <div>
                   {
                    services.map(props => (
                        <div key={props.id}>
                            <ServiceItem service={props}/>
                        </div>
                    )
                    )
                   }
                </div>
            </div>
        </div>
    )
    }

}

export default withAuthorization(UserServices)