import ServiceItem from "components/services/ServiceItem";
import { connect } from "react-redux"; //osszekapcsolas a funkciokat
import { fetchServices } from 'actions'
import React from "react";
import { Carousel } from "flowbite-react";



class Home extends React.Component {

    state = {
        services: []
    }

    componentDidMount() {
        this.props.fetchServices()
    }

    renderServices = (services) => services.map(service => <ServiceItem key={service.id} service={service} />)
    render() {
        const { services } = this.props


        return (
            <div className="">
                <div className="flex flex-col gap-6">
                <div>
                    <h1>Greate Power Come</h1>
                </div>
                <div className="flex flex-row gap-6">
                  {this.renderServices(services)}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        services: state.services.items
    }
}

export default connect(mapStateToProps, { fetchServices })(Home)