import { render } from 'enzyme';
import React from "react";
import Home from "../../src/components/home";
import { expect } from "chai";

describe("<Home />", () => {
  it("should render Home components", () => {
    const home = render(<Home />);
    expect(home.find("div").length).to.equal(1);
    expect(home.find("a").length).to.equal(2);
  });
});
