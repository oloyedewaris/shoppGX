import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { Products } from "./Data";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Check, setCheck] = useState([]);

  const handleCheck = (product) => {
    const currIndex = Check.indexOf(product);
    const newCheck = [...Check];
    if (!Check.includes(product)) {
      newCheck.push(product);
    } else {
      newCheck.splice(currIndex, 1);
    }
    setCheck(newCheck);
    props.handleFilter(newCheck);
  };

  return (
    <div>
      <Collapse>
        <Panel header="Laptops" key="1">
          {Products.map((product, i) => (
            <React.Fragment key={i}>
              <Checkbox
                style={{ margin: "auto 7px", textAlign: "center" }}
                onChange={() => handleCheck(product)}
                type="checkbox"
                checked={Check.includes(product)}
              />
              <span>{product}</span>
            </React.Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
