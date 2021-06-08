import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { url } from "../../../utils/url";

const ProductImage = props => {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.info.images && props.info.images.length > 0) {
      const images = [];

      props.info.images &&
        props.info.images.forEach(item => {
          images.push({
            original: `${url}/${item}`,
            thumbnail: `${url}/${item}`
          });
        });
      setImages(images);
    }
  }, [props.info]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
};

export default ProductImage;
