import { useParams } from "react-router-dom"
import { connect } from 'react-redux'
import { useEffect } from "react"
import { fetchById } from "actions"
import OfferModal from "components/services/OfferModal"
import { Card } from "flowbite-react"


function ServiceDetail(props) {
    const { serviceId } = useParams()
    const { fetchById } = props

    useEffect(() => {
        fetchById(serviceId)
    }, [serviceId, fetchById])

    const { services, auth } = props


    if(services.length > 0 ) {
    console.log(services.user.uid)
    console.log(auth.user.uid)
    }

    return (
            <div className="max-w-sm">
                <Card
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={`${services.image}`}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {services.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {services.description}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        ${services.price}
                    </p>
                   
                    <OfferModal
                                 auth={auth}
                                 service={services} 
                    />
                   
                </Card>
            </div>
    )
}
const mappingProps = ({ selectedService, auth }) => {
    return {
        services: selectedService.item,
        auth

    }
}

export default connect(mappingProps, { fetchById })(ServiceDetail)