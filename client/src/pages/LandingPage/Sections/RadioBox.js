import React from "react";
import { Collapse, Radio } from "antd";
import { useState } from "react";
import { Price } from "./Data";

const { Panel } = Collapse;

function Radiobox(props) {
  const [Value, setValue] = useState("0");

  const handleChange = e => {
    setValue(e.target.value);
    props.handleFilter(e.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {Price.map(price => (
              <Radio key={price._id} value={`${price._id}`}>
                {price.name}
              </Radio>
            ))}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default Radiobox;
