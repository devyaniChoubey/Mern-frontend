import { Col, Row } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

const UpdateCategoriesModal = (props) => {
    const {size,modalTitle,handleChange, handleClose,expandedArray,checkedArray,handleCategoryInput,categoryList,show,handleCategoryImage} = props;
    return (
        <Modal size={size} show={show} handleChange={handleChange} modalTitle={modalTitle} handleClose={handleClose}>
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input value={item.name} placeholder={item.name} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')} />
                        </Col>
                        <Col>
                            <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>Select Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control" value={item.type} onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))
            }
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>

            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input value={item.name} placeholder={'Category Name'} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')} />
                        </Col>
                        <Col>
                            <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Select Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control" value={item.type} onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>

                ))
            }
        </Modal>
    )
}

export default UpdateCategoriesModal;