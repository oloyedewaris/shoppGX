import React from "react";
import { Carousel } from "antd";
import { url } from "../utils/url";

const ImageSlider = props => {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <img key={index} src={`${url}/${image}`} alt={image} />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
