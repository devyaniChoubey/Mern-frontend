import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Container, Col, Row } from 'react-bootstrap';


const AddCategoryModal = (props) => {
    const { show, handleChange, handleChange1, modalTitle, handleClose, categoryName, setCategoryName, parentCategoryId, categoryList, handleCategoryImage } = props;
    return (
        <Modal show={show} handleChange={handleChange} modalTitle={modalTitle} handleClose={handleClose}>
            <Row>
                <Col>
                    <Input value={categoryName} placeholder={'Category Name'} className="form-control-sm" onChange={(e) => setCategoryName(e.target.value)} />
                </Col>
                <Col>
                    <select className="form-control form-control-sm" value={parentCategoryId} onChange={handleChange1}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>


        </Modal>
    )

}

export default AddCategoryModal;