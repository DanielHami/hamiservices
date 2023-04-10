import { fetchSentOffers, collaborate } from "actions";
import { newCollaboration, newMessage } from "collaboration/offers";
import withAuthorization from "components/hoc/withAuthorization";
import ServiceItem from "components/services/ServiceItem";
import React from "react";
import { connect } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { Badge } from "flowbite-react";
import Spinner from "components/spinner/Spinner";

class SentOffers extends React.Component {

  componentDidMount() {
    const { auth } = this.props
    this.props.dispatch(fetchSentOffers(auth.user.uid))
  }

  createCollaboration = offer => {
    const { auth: { user } } = this.props
    const collaboration = newCollaboration({ offer, fromUser: user })
    const message = newMessage({ offer, fromUser: user })

    this.props.collaborate({ collaboration, message })
      .then(_ => {
        toast.success('Collaboration was created!')
      })
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
      <div>
        <h1 className="text-2xl font-semibold mb-10" >Sent Offers</h1>
        { !isFetching && offers.length === 0 &&
            <span className="tag is-warning is-large">You don't have any send offers :(</span>
          }
        <div className="flex flex-row gap-6">
          {offers.map(offer => (
            <div key={offer.id}>
              <ServiceItem service={offer.service}>
                <div>
                  <Badge
                    color={this.statusClass(offer.status)}
                    size="sm"
                  >
                    {offer.status}
                  </Badge>
                </div>
                <div>
                  <span>To user: </span>{offer.toUser.fullname}
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
                {offer.status === 'accepted' && !offer.collaborationCreated &&
                  <div className="text-center">
                    <button
                      onClick={() => this.createCollaboration(offer)} className="bg-amber-300 rounded-lg px-6 h-8">Collaborate
                    </button>
                  </div>
                }
              </ServiceItem>
            </div>
          ))
          }
        </div>
        <Toaster position="top-right"
          reverseOrder={false} />
      </div>
    )
  }
}

const mapStateToProps = ({offers}) => ({ offers: offers.sent, isFetching: offers.isFetching })

export default withAuthorization(connect(mapStateToProps, { collaborate })(SentOffers))