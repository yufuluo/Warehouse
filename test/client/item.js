import { render } from 'enzyme';
import React from "react";
import Item from "../../src/components/item";
import { expect } from "chai";

describe("<Item />", () => {
  it.only("should render Item component", () => {
    const src = "https://cdn.shopify.com/s/files/1/0691/2367/t/4/assets/Featured-Image-Rilakkuma.jpg?2448836847819683817";
    const item = render(
      <Item
        id="1"
        itemName="test item"
        description="test description"
        price="0.99"
        image={src}
        key="1"
      />);
    const form = item.find("form")[0];
    expect(form.attribs.id).to.equal("1display");
    expect(form.attribs.class).to.equal("item");

    const img = item.find("img")[0];
    expect(img.attribs.class).to.equal("image");
    expect(img.attribs.src).to.equal(src);

    const itemName = img.next;
    expect(itemName.children[0].data).to.equal("test item");

    const description = itemName.next;
    expect(description.children[0].data).to.equal("test description");

    const price = description.next;
    expect(price.children[0].data).to.equal("0.99");

    const id = price.next;
    expect(id.children[0].data).to.equal("1");

    const cancle = id.next.children[0];
    expect(cancle.attribs.class).to.equal("button ");
    expect(cancle.children[0].data).to.equal("Delete");
  });
});
