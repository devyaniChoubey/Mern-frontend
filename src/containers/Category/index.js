import Layout from '../../components/Layout';
import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategories } from '../../actions/category.action';
import { useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal/index';
import { getAllCategory } from "../../actions/category.action";
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

    // useEffect(() => {
    //     dispatch(getAllCategory())
    // }, [])

    const handleChange = () => {
        const form = new FormData();
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
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
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }

        return categorie;

    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
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

    const updateCategory = () => {
        setUpdateCategoryModal(true)
        const categories = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, expandedArray, checkedArray })

    }

  

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray);
        }
    }


    // const updateCategoriesForm = () => {
    //     const form = new FormData();

    //     expandedArray.forEach((item, index) => {
    //         form.append('_id', item.value);
    //         form.append('name', item.name);
    //         form.append('parentId', item.parentId ? item.parentId : "");
    //         form.append('type', item.type);
    //     });
    //     checkedArray.forEach((item, index) => {
    //         form.append('_id', item.value);
    //         form.append('name', item.name);
    //         form.append('parentId', item.parentId ? item.parentId : "");
    //         form.append('type', item.type);
    //     });
    //     dispatch(updateCategories(form));
        
    // }

    const updateCategoriesForm =() => {
        const form= new FormData();

        expandedArray.forEach((item,index) =>{
            form.append('_id',item.value);
            form.append('name',item.name);
            form.append('parentId',item.parentId ? item.parentId :"")
            form.append('type',item.type);
        })

        checkedArray.forEach((item,index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type',item.type)
        })

        dispatch(updateCategories(form))

        setUpdateCategoryModal(false);
    }

    const renderUpdatecategriesModal = () => {
        return (
            <Modal size={"lg"} show={updateCategoryModal} handleChange={updateCategoriesForm} modalTitle={'Update Categories'} handleClose={() => setUpdateCategoryModal(false)}>
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
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className="form-control">
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )).
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
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className="form-control">
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>

                    ))
                }
                <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        )
    }

    const renderAddCategoryModal = () => {
        <Modal show={show} handleChange={handleChange} modalTitle={'Add New Category'} handleClose={handleClose}>
            <Input value={categoryName} placeholder={'Category Name'} onChange={(e) => setCategoryName(e.target.value)} />
            <select className="form-control" value={parentCategoryId} onChange={handleChange1}>
                <option>select category</option>
                {
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>
            <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Modal>
    }



    return (

        <Layout sidebar >
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
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <   IoIosCheckbox />,
                                uncheck: <  IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={updateCategory}>Edit</button>
                        <button>Delete</button>
                    </Col>
                </Row>
            </Container>

            {renderAddCategoryModal()}
            {renderUpdatecategriesModal()}
        </Layout>
    )

}

export default Category;