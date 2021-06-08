import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;
function SearchBox(props) {
  const [SearchInput, setSearchInput] = useState("");

  const onSearchInputChange = e => {
    setSearchInput(e.currentTarget.value);
    props.updateSearch(e.currentTarget.value);
  };

  return (
    <div>
      <Search
        type="text"
        onChange={onSearchInputChange}
        value={SearchInput}
        placeholder="Search phone... "
      />
    </div>
  );
}

export default SearchBox;
