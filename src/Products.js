import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Typography,
  message,
  Table,
  Space,
  Layout,
  Tour,
} from "antd";
import { Link } from "react-router-dom";
import AdminSider from "./AdminSider";
import { Box, Flex, FormControl } from "@chakra-ui/react";

const { Text } = Typography;

const ProductsDashboard = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const openEditModal = (record) => {
    setEditModalVisible(true);
    setEditedProduct(record);
  };

  const addDocument = async () => {
    try {
      await addDoc(collection(db, "Products"), {
        productName: productName,
        price: price,
        image: image,
        description: description,
        Tag: Tag,
      });
      message.success("Product added successfully!");
      getProducts();
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("An error occurred while adding the product.");
    }
  };
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
  };

  const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, "Products", productId));
    message.success("Product deleted successfully!");
    getProducts();
  };

  const handleEditSubmit = async () => {
    try {
      const productDocRef = doc(db, "Products", editedProduct.id);
      await updateDoc(productDocRef, {
        productName: editedProduct.productName,
        price: editedProduct.price,
        image: editedProduct.image,
        description: editedProduct.description,
        Tag: editedTag,
      });
      message.success("Product updated successfully!");
      setEditModalVisible(false);
      getProducts();
    } catch (error) {
      console.error("Error updating document: ", error);
      message.error("An error occurred while updating the product.");
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} height={50} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <Text>{text} EGP</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button ref={ref2} onClick={() => deleteProduct(record.id)}>
            Delete
          </Button>
          <Button ref={ref3} onClick={() => openEditModal(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  const [Tag, setTag] = useState();
  const [editedTag, setEditedTag] = useState();
  useEffect(() => {
    getProducts();
  }, []);

  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps = [
    {
      title: "Add Product Data",
      description: "Fill the above fields with the data",
      target: ref1.current,
    },
    {
      title: "Delete Product",
      description: "Delete Product FOREVER",
      placement: "leftTop",
      target: () => ref2.current,
      arrow: "pointAtCenter",
    },
    {
      title: "Edit Tags",
      description:
        "Tag product with 'Homepage' if you want to see it in the homepage.",
      placement: "top",
      target: () => ref3.current,
    },
    {
      title: "Tags",
      description: "Edit Tag From Here",
      target: () => ref3.current,
    },
  ];
  return (
    <Layout>
      <AdminSider />
      <Flex direction={"column"}>
        <Box bg={"whiteAlpha.500"} border={"wheat"} padding={5}>
          <Space wrap>
            <Flex direction={"column"}>
              <Button
                type="primary"
                style={{ marginBottom: 10 }}
                onClick={() => setOpen(true)}
                ref={ref}
              >
                Begin Tour
              </Button>
              <Tour
                open={open}
                onClose={() => setOpen(false)}
                steps={steps}
                mask={{
                  style: {
                    boxShadow: "inset 0 0 15px #333",
                  },
                  color: "rgba(80, 255, 255, .4)",
                }}
              />{" "}
              <Link to={"/"}>
                <Button>View In Shop</Button>
              </Link>
            </Flex>
            <Row justify={"space-between"} align={"middle"} wrap>
              <Form>
                <Row wrap>
                  <Form.Item ref={ref1}>
                    <Input
                      required
                      width={200}
                      type="text"
                      placeholder="Add Product Name"
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item ref={ref2}>
                    <Input
                      required
                      width={200}
                      type="text"
                      placeholder="Add Product Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item>
                    {" "}
                    <Input
                      required
                      type="text"
                      placeholder="Add Product Image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      required
                      type="text"
                      placeholder="Add Product Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      required
                      type="text"
                      placeholder="Add Product Tag (Homepage/Shop)"
                      onChange={(e) => setTag(e.target.value)}
                    />
                  </Form.Item>
                </Row>
                <Col>
                  <Button onClick={addDocument}>Add Product</Button>
                </Col>
              </Form>
            </Row>
          </Space>
          <Modal
            title="Edit Product"
            visible={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            onOk={handleEditSubmit}
          >
            <Form>
              <Form.Item label="Product Name">
                <Input
                  value={editedProduct.productName}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      productName: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Product Price">
                <Input
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Product Image">
                <Input
                  value={editedProduct.image}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Product Description">
                <Input
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="Product Tag">
                <Input
                  value={editedTag}
                  onChange={(e) => setEditedTag(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Box>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={false}
        />
      </Flex>
    </Layout>
  );
};

export default ProductsDashboard;
