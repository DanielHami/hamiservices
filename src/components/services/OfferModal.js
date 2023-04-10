import Modals from "components/modals/Modal"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { createOffer } from "actions";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";

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
            <Modals onModalSubmit={handleSubmit}>
                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Write some note"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            type="text"
                            name="note"
                            placeholder="name@flowbite.com"
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="How long you need service for"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            type="number"
                            name="time"
                            required={true}
                            onChange={handleChange}
                        />
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
            </Modals>
            <Toaster position="top-right"
                reverseOrder={false} />
        </>
    )
}

export default OfferModal