import Modal from "components/modals/Modal"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { createOffer } from "actions";

const OfferModal = ({ service, auth }) => {


    const [offer, setOffer] = useState({
        fromUser: '',
        toUser: '',
        service: '',
        status: 'pending',
        price: 0,
        time: 0,
        note: ''
    })

    const handleChange = ({ target: { value, name } }) => {
        if (name === 'time') {
            const price = Math.round(value * service.price * 100) / 100

            return setOffer({ ...offer, [name]: value, price })
        }
        return setOffer({ ...offer, [name]: value })
    }

    const handleSubmit = () => {

        const copyOffer = { ...offer }

        copyOffer.fromUser = auth.user.uid
        copyOffer.toUser = service.user.uid
        copyOffer.service = service.id
        copyOffer.time = parseInt(offer.time, 10)
        createOffer(copyOffer)
            .then(_ => {
                toast.success('Your offer is sended')
            })

    }

    return (
        <>
            <Modal onModalSubmit={handleSubmit}>
                <form className='flex flex-col gap-4'>
                    <div>
                        <div className="mb-2 block">
                            <label>Write some note</label>
                        </div>
                        <input
                            name="note"
                            onChange={handleChange}
                            type="text"
                            className='border-gray-300 bg-gray-50 rounded-lg w-full'>

                        </input>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label>How long you need service for</label>
                        </div>
                        <input
                            name="time"
                            onChange={handleChange}
                            type="number"
                            className='border-gray-300 bg-gray-50 rounded-lg w-full'>
                        </input>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <div>
                        {service.user && `Uppon acceptance ${service.user.fullname}`}
                    </div>
                    <div>
                        <p>Price: {offer.price}$</p>
                    </div>
                </div>
            </Modal>
            <Toaster position="top-right"
                reverseOrder={false} />
        </>
    )
}

export default OfferModal