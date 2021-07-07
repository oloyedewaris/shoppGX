import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { url } from "../../utils/url";
import { tokenConfig } from "../../redux/actions/productsActions";

const Products = [
  "Select Laptop",
  "HP",
  "Dell",
  "Lenovo",
  "Apple",
  "Acer",
  "Asus",
  "Samsung",
];

const UploadPage = props => {
  const [TitleValue, setTitleValue] = useState("");
  const [PriceValue, setPriceValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [ProductValue, setProductValue] = useState("");
  const [Images, setImages] = useState([]);
  const userData = useSelector(state => state.user.userData);

  const onTitleChange = e => {
    setTitleValue(e.currentTarget.value);
  };

  const onPriceChange = e => {
    setPriceValue(e.currentTarget.value);
  };

  const onDescriptionChange = e => {
    setDescriptionValue(e.currentTarget.value);
  };

  const onProductChange = e => {
    setProductValue(e.currentTarget.value);
  };

  const updateImage = image => {
    setImages(image);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      !TitleValue ||
      !DescriptionValue ||
      !ProductValue ||
      !PriceValue ||
      !Images ||
      ProductValue === "Select Laptop"
    )
      return alert("Please enter all fields");
    const product = {
      writer: userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      product: ProductValue
    };

    Axios.post(`${url}/api/products/uploadProduct`, product, tokenConfig).then(
      res => {
        if (res.data.success) {
          alert("Successfully Upload Product");
          props.history.push("/");
        } else {
          alert("Failed to upload product");
        }
      }
    );
  };

  const { Title } = Typography;
  const { TextArea } = Input;

  return (
    <div>
      <div style={{ marginBottom: "5px", width: "85%", margin: "3rem auto" }}>
        <h2>Upload Product</h2>
        <Form onSubmit={onSubmit}>
          <FileUpload refreshFunction={updateImage} />
          <br />
          <Title level={4}>Title</Title>
          <br />
          <Input onChange={onTitleChange} value={TitleValue} type="text" />
          <br />
          <Title level={4}>Description</Title>
          <br />
          <TextArea
            onChange={onDescriptionChange}
            value={DescriptionValue}
            type="text"
          />
          <br />
          <Title level={4}>Price($)</Title>
          <br />
          <Input onChange={onPriceChange} value={PriceValue} type="number" />
          <br />
          <br />
          <select className="select" onChange={onProductChange}>
            {Products.map((product, i) => (
              <option key={i} value={product}>
                {product}
              </option>
            ))}
          </select>
          <br />
          <br />
          <Button onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default UploadPage;
