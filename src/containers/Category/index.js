import Layout from '../../components/Layout';
import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, deleteCategoriesAction, updateCategories } from '../../actions/category.action';
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
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';


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
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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
            options.push({ value: category._id, name: category.name, parentId: category.parentId, type: category.type })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleChange1 = (e) => {
        console.log(e.target.value);
        setParentCategoryId(e.target.value);
    }

    const updateCheckedAndExpandedCategories = () => {
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
    }


    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
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


    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type);
        })

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
            console.log(form.get('name'))
        })
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false);
    }


    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }))
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }))
        const idsArray = expandedIdsArray.concat(checkedIdsArray)

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        
                    }
                })
        }
        setDeleteCategoryModal(false);

    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal modalTitle="Confirm" show={deleteCategoryModal} handleClose={() => setDeleteCategoryModal(false)} buttons={[
                {
                    label: 'No',
                    color: 'primary',
                    onClick: () => {
                        alert('no')
                    }
                },
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: deleteCategories
                }
            ]}>
                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
            </Modal>
        )
    }


    return (

        <Layout sidebar >
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button variant="primary" onClick={() => setShow(true)}><IoIosAdd/><span>Add</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload/><span>Edit</span></button>
                                <button onClick={deleteCategory}><IoIosTrash/><span>Delete</span></button>
                            </div>

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
                                check: < IoIosCheckbox />,
                                uncheck: <  IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleChange={handleChange}
                modalTitle={'Add New Category'}
                handleClose={handleClose}
                handleChange1={handleChange1}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                handleCategoryImage={handleCategoryImage}
                categoryList={createCategoryList(category.categories)}
            />
            <UpdateCategoriesModal
                size={"lg"}
                show={updateCategoryModal}
                handleChange={updateCategoriesForm}
                modalTitle={'Update Categories'}
                handleClose={() => setUpdateCategoryModal(false)}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                handleCategoryImage={handleCategoryImage}
                categoryList={createCategoryList(category.categories)}
            />
            {renderDeleteCategoryModal()}
        </Layout>
    )

}

export default Category;