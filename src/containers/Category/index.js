import Layout from '../../components/Layout';
import { Container, Col, Row, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../actions/category.action';
import { useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import {getAllCategory} from "../../actions/category.action";

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");



    // useEffect(() => {
    //     dispatch(getAllCategory())
    // }, [])

    const handleChange = () => {
        const form = new FormData();
        form.append('name', categoryName)
        form.append('parentid', parentCategoryId)
        form.append('categoryImage', categoryImage)
        console.log(form.get('name'))
        console.log(form.get('parentId'))
        console.log(form.get('categoryImage'))
        dispatch(addCategory(form))

        setShow(false);
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();


    console.log("Category is")
    console.log(JSON.stringify(category))

    const renderCategories = (categories) => {
        let categorie = [];
        for (let category of categories) {
            categorie.push(
                <li key={category.name}>{category.name}{category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}</li>
            )
        }

        return categorie;

    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            console.log({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleChange1 = (e) => {
       console.log(e.target.value);
       setParentCategoryId(e.target.value);
    }

    return (

        <Layout sidebar >
            {/*<p>Test</p>*/}
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h3>Category</h3>
                            <button variant="primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={categoryName} placeholder={'Category Name'} onChange={(e) => setCategoryName(e.target.value)} />
                    <select className="form-control" value={parentCategoryId} onChange={handleChange1}>
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                    <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )

}

export default Category;