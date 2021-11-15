import { useState } from 'react'
import Layout from '../../components/Layout';
import { Row, Col, Container,Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions/category.action';
import Modal from '../../components/UI/Modal/index';
import { addProduct } from '../../actions';

import {addProduct} from "./../../actions/product.action"
/**
* @author
* @function Products
**/
const Products = (props) => {

  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState('');
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    console.log(form.get('name'))
    for(let pic of productPictures){
      form.append('productPicture', pic);
    }

    console.log(form.get("productPicture"))

    dispatch(addProduct(form))
    setShow(false)
  }
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }


  const renderProducts = () => {
    return(
      <Table responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      </tbody>
    </Table>
    )
  }


  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  console.log(productPictures)
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h3>Product</h3>
              <button variant="primary" onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
           {renderProducts()}
          </Col>
        </Row>

      </Container>
      <Modal show={show} handleChange={handleSubmit} modalTitle={'Add New Product'} handleClose={handleClose}>

        <Input label="Name" value={name} placeholder={'Product Name'} onChange={(e) => setName(e.target.value)} />
        <Input label="Quantity" value={quantity} placeholder={'Product Quantity'} onChange={(e) => setQuantity(e.target.value)} />
        <Input label="Price" value={price} placeholder={'Product Price'} onChange={(e) => setPrice(e.target.value)} />
        <Input label="Description" value={description} placeholder={'Product Description'} onChange={(e) => setDescription(e.target.value)} />
        <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option>Select category</option>
          {
            createCategoryList(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>
        {
          productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name} </div>) : null
        }
        <input type="file" name="productPictures" onChange={handleProductPictures} />

      </Modal>
    </Layout>
  )

}

export default Products;