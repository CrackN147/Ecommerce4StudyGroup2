import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {api} from '../../global/services/api';
export function ProductEdit() {
  const {prID} = useParams();
  const [initialValues, setInitialValues] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  
  const validateSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(150, 'Title is too long'),
    price: Yup.number().required('Price is required').max(1000, 'Price is too high'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image is required'),
    category: Yup.string().required('Category is required')
  });

  async function handleSubmit(values) {
    const apiData = await api._put(`https://fakestoreapi.com/products/${prID}`, values);
    if (apiData.status === 200) {
      setInitialValues({
        title: '',
        price: '',
        description: '',
        image: '',
        category: ''
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const apiData = await api._get(`https://fakestoreapi.com/products/${prID}`);
      if (apiData.status === 200) {
        setInitialValues(apiData.data);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="productAdd">
      <h1>Product Edit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Field type="number" name="price" />
            <ErrorMessage name="price" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <Field type="text" name="image" />
            <ErrorMessage name="image" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Field type="text" name="category" />
            <ErrorMessage name="category" className="error" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}