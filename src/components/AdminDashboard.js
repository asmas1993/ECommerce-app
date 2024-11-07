import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (values) => {
    await addDoc(collection(db, 'products'), values);
    alert('Product added');
  };

  const handleUpdateProduct = async (values) => {
    await updateDoc(doc(db, 'products', editingProduct.id), values);
    alert('Product updated');
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    alert('Product deleted');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Formik
        initialValues={editingProduct || { name: '', price: '', category: '', image: '' }}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
      >
        <Form>
          <label>
            Name:
            <Field type="text" name="name" />
          </label>
          <ErrorMessage name="name" component="div" />
          <label>
            Price:
            <Field type="number" name="price" />
          </label>
          <ErrorMessage name="price" component="div" />
          <label>
            Category:
            <Field type="text" name="category" />
          </label>
          <ErrorMessage name="category" component="div" />
          <label>
            Image URL:
            <Field type="text" name="image" />
          </label>
          <ErrorMessage name="image" component="div" />
          <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
        </Form>
      </Formik>

      <div className="product-list">
        <h3>Manage Products</h3>
        {products.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
