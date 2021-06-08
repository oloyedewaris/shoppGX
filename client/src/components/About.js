import React from "react";
import { Row, Col, Layout, List } from "antd";
import waris from "../assets/waris.jpg";

const About = () => {
  const data = [
    {
      title: "Responsive Websites",
      desc:
        "I build responsive and pixel perfect websites for desktop, tablets and mobile devices"
    },
    {
      title: "Web Applications",
      desc:
        "I build great web apps with React, Redux and some third party libraries"
    },
    {
      title: "Restful APIs",
      desc:
        "I build restful APIs which will be used by front-end engineers with the help of Node, Express and mongoDB"
    }
  ];

  return (
    <div>
      <Row>
        <Col
          xs={24}
          sm={20}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "15px"
          }}
        >
          <img
            className="rounded-circle"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "30vh",
              height: "30vh",
              margin: "15px"
            }}
            src={waris}
            alt="waris"
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18}>
          <Layout style={{ margin: "10px" }}>
            <Layout.Header className="about-header">
              I AM WARIS OLOYEDE
            </Layout.Header>
            <Layout.Content>
              I am Waris Oloyede, an Undergraduate Computer Science student of
              OAU Ile-Ife. I am a mern-stack developer, I build websites and web
              applications using React, Express, Node and MongoDB.
            </Layout.Content>
            <Layout.Content style={{ margin: "10px" }}>
              <h3>My Services</h3>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
            </Layout.Content>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default About;
