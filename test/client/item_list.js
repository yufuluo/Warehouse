import { render } from 'enzyme';
import React from "react";
import ItemList from "../../src/components/item_list";
import { expect } from "chai";

describe("<ItemList />", () => {
  it.only("should render Item component", () => {
    const src1 = "https://cdn.shopify.com/s/files/1/0691/2367/t/4/assets/Featured-Image-Rilakkuma.jpg?2448836847819683817";
    const src2 = "http://jpninfo.com/wp-content/uploads/2015/05/Rilakkuma-1.gif";
    const data = [
      {
        id: "1",
        itemName: "test item 1",
        description: "test description 1",
        price: "0.99",
        image: src1
      },
      {
        id: "2",
        itemName: "test item 2",
        description: "test description 2",
        price: "0.88",
        image: src2
      }
    ];

    const itemList = render(<ItemList data={data} />);
    const div = itemList.find("div")[0];
    expect(div.attribs.class).to.equal("itemList");
    console.log(div);
  });
});