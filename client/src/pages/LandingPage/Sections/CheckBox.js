import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { Phones } from "./Data";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Check, setCheck] = useState([]);

  const handleCheck = (phone) => {
    const currIndex = Check.indexOf(phone);
    const newCheck = [...Check];
    if (!Check.includes(phone)) {
      newCheck.push(phone);
    } else {
      newCheck.splice(currIndex, 1);
    }
    setCheck(newCheck);
    props.handleFilter(newCheck);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Phones" key="1">
          {Phones.map((phone, i) => (
            <React.Fragment key={i}>
              <Checkbox
                style={{ margin: "auto 7px", textAlign: "center" }}
                onChange={() => handleCheck(phone)}
                type="checkbox"
                checked={Check.includes(phone)}
              />
              <span>{phone}</span>
            </React.Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
