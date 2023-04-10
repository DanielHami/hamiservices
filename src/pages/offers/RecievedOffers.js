import { fetchRecievedOffers, acceptOffer, declineOffer } from "actions";
import withAuthorization from "components/hoc/withAuthorization";
import ServiceItem from "components/services/ServiceItem";
import React from "react";
import { connect } from "react-redux";
import { Badge } from "flowbite-react";
import Spinner from "components/spinner/Spinner";

class RecievedOffers extends React.Component {

  componentDidMount() {
    const { auth } = this.props
    this.props.fetchRecievedOffers(auth.user.uid)
  }

  acceptOffer = offer => {
    this.props.acceptOffer(offer)
  }

  declineOffer = offer => {
    this.props.declineOffer(offer)
  }
  statusClass = state => {
    if (state === 'pending') { return 'warning' }
    if (state === 'accepted') { return 'success' }
    if (state === 'declined') { return 'failure' }
  }
  render() {
    const { offers, isFetching } = this.props

    if (isFetching) { return <Spinner />}

    return (
      <div className="">
          <h1 className="text-2xl font-semibold mb-10 ">Recieved Offers</h1>
          { !isFetching && offers.length === 0 &&
            <span className="tag is-warning is-large">You don't have any received offers :(</span>
          }
       <div className="flex flex-row gap-6">
        {offers.map(offer => (
          <div key={offer.id} className="">
            <ServiceItem service={offer.service}>
              <Badge
                color={this.statusClass(offer.status)}
                size="sm"
              >
                {offer.status}
              </Badge>
              <div>
                <span>To User: </span>{offer.fromUser.fullname}
              </div>
              <div>
                <span>Note: </span>{offer.note}
              </div>
              <div>
                <span>Price: </span>{offer.price}
              </div>
              <div>
                <span>Time: </span>{offer.time}
              </div>
              {offer.status === 'pending' &&
                <div className="flex justify-around border-t-2 pt-4 ">
                  <div>
                    <button onClick={() => this.acceptOffer(offer.id)} className="bg-emerald-400 text-slate-100 rounded-md px-4 h-8">Accept</button>
                  </div>
                  <div>
                    <button onClick={() => this.declineOffer(offer.id)} className="bg-rose-500 rounded-md px-3 h-8">Decline</button>
                  </div>
                </div>
              }
            </ServiceItem>
          </div>
        ))
        }
      </div>
      </div>
    )
  }
}

const mapStateToProps = ({offers}) => ({ offers: offers.received, isFetching: offers.isFetching })

const mapDispatchToProps = () => ({
  acceptOffer,
  declineOffer,
  fetchRecievedOffers
})

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps())(RecievedOffers))