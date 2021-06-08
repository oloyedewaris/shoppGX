import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Row, Col } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Axios from "axios";
import { url } from "./url";
import { tokenConfig } from "../redux/actions/productsActions";

const FileUpload = props => {
  const [Images, setImages] = useState([]);
  const onDrop = files => {
    let formData = new FormData();
    formData.append("file", files[0]);

    //Save to node server
    Axios.post(`${url}/api/products/uploadFile`, formData, tokenConfig).then(
      res => {
        if (res.data.success) {
          setImages([...Images, res.data.image]);
          props.refreshFunction([...Images, res.data.image]);
        } else {
          alert("Failed to save image in server");
        }
      }
    );
  };

  const onDeleteImage = index => {
    let imageArray = [...Images];
    imageArray.splice(index, 1);

    setImages(imageArray);
    props.refreshFunction(imageArray);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Row gutter={[16, 16]}>
        <Col
          lg={12}
          md={12}
          xs={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Dropzone onDrop={onDrop} maxSize={100000000} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "250px",
                  border: "1px solid lightgrey",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined type="plus" style={{ fontSize: "4rem" }} />
              </div>
            )}
          </Dropzone>
        </Col>
        <Col
          lg={12}
          md={12}
          xs={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              minWidth: "300px",
              width: "320px",
              height: "250px",
              outline: "none"
            }}
          >
            {Images.map((image, index) => (
              <div key={index}>
                <img
                  style={{ height: "250px", width: "220px" }}
                  src={`${url}/${image}`}
                  alt={image}
                />
                <DeleteOutlined onClick={() => onDeleteImage(index)} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FileUpload;
