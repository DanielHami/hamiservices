import 'tw-elements';

import { Modal } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useState } from 'react';

const Modals = props => {

    const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
    return (
        <>
            <Button onClick={handleOpen}>
                Open
            </Button>
            <Modal
                show={showModal}
                onClose={handleClose}
            >
                <Modal.Header>
                    Make a deal
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {props.children}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onModalSubmit}>
                        Send
                    </Button>
                    <Button
                        color="gray"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Modals