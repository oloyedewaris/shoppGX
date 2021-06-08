import React, { useState } from "react";
import { List, Layout, Button } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  DribbbleOutlined
} from "@ant-design/icons";

const About = () => {
  const [Message, setMessage] = useState("");

  const messageHandler = e => {
    setMessage(e.target.value);
  };

  const clickHandler = () => {
    Message.replace(" ", "%20");
  };

  const data = [
    {
      title: "Phone",
      desc: "+234 810 8745 769"
    },
    {
      title: "Email",
      desc: "oloyedewaris@gmail.com"
    },
    {
      title: "Address",
      desc: "Isawo Road, Ikorodu, Lagos Nigeria"
    }
  ];

  return (
    <div>
      <Layout>
        <h1 style={{ margin: "auto 20px" }}>I am Waris oloyede </h1>
        <Layout.Content style={{ margin: "10px" }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.desc} />
              </List.Item>
            )}
          />
        </Layout.Content>
      </Layout>
      <div style={{ margin: "10px" }}>
        <h5 style={{ margin: "10px" }}>GET IN TOUCH </h5>
        <a
          href="https://www.instagram.com//temi_topzee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a
          href="https://mobile.twitter.com/waris_oloyede"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a
          href="https://www.facebook.com/waris.oloyede.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/waris-oloyede-26482319b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a href="https://github.com/oloyedewaris">
          <GithubOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a href="https://wa.me/2348108745769?text=Hello+Waris">
          <WhatsAppOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <a href="https://dribbble.com/Topzee">
          <DribbbleOutlined
            style={{ color: "black", margin: "10px", fontSize: "1.5rem" }}
          />
        </a>
        <div>
          <p>You can also message me here on Whatsapp</p>
          <textarea
            type="text"
            onChange={messageHandler}
            placeholder="Enter Your Message"
          />{" "}
          <br />
          <Button onClick={clickHandler}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/2348108745769?text=${Message}`}
            >
              Send
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
