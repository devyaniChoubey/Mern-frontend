import Layout from '../../components/Layout';
import { Row, Col, Container } from 'react-bootstrap';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { useEffect, useState } from 'react';
import linearCategories from '../../helpers/linearCategories';
import { useSelector,useDispatch } from 'react-redux';
import { createPage } from '../../actions';

/**
* @author
* @function 
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [type,setType] = useState("");
    const [desc, setDesc] = useState("");
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const category = useSelector(state => state.category)
    const page = useSelector(state => state.page);
    const dispatch = useDispatch();


    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id=== e.target.value);
        setCategoryId(e.target.value)
        setType(category.type)
    }


    useEffect(() => {
        setCategories(linearCategories(category.categories))
    }, [])


    useEffect(() => {
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page])


    const submitPageForm = () =>{
        if(title  === ""){
            alert("Title is required");
            setCreateModal(false);
            return;
        }
        const form= new FormData();
        form.append('title',title);
        form.append('description',desc);
        form.append('category',categoryId);
        form.append('type',type);

        banners.forEach((banner,index) => {
            form.append("banners",banner);
        })
        products.forEach((product,index) => {
            form.append("products",product);
        })
        dispatch(createPage(form));
    }


    const renderCreatePageModal = () => {
        return (
            <Modal show={createModal} modalTitle={'Create New Page'} handleChange={submitPageForm} handleClose={() => setCreateModal(false)}>
                <Container>
                    <Row>
                        <Col>
                            <select className="form-control form-control-sm" value={categoryId} onChange={onCategoryChange}>
                                <option>select category</option>
                                {
                                    categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)
                                }
                            </select>
                          {/* {/* //  <Input type="select" value={categoryId} onChange={onCategoryChange} placeholder={'select category'} options={categories}/> */}
                        </Col> 
                    </Row>
                    <Row>
                        <Col>
                            <Input className="form-control-sm" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'Page Title'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="form-control-sm" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={'Page Desc'} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            banners.length > 0 ? banners.map((banner, index) =>
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                        }
                        <Col>
                            <Input className="form-control-sm" type="file" name="banners" onChange={handleBannerImages} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.length > 0 ? products.map((product, index) =>
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                        }
                        <Col>
                            <Input className="form-control-sm" type="file" name="products" onChange={handleProductImages} />
                        </Col>
                    </Row>
                </Container>

            </Modal>
        )
    }

    return (
        <Layout sidebar>
            {page.loading ? <p>Loading....</p>:<>{renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button></>} 
        </Layout>
    )



}

export default NewPage;