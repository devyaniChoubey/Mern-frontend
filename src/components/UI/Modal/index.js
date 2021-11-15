import { Modal, Button } from "react-bootstrap";

const NewModal = (props) => {
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default NewModal;