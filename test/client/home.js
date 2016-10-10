import { render } from 'enzyme';
import React from "react";
import Home from "../../src/components/home";
import { expect } from "chai";

describe("<Home />", () => {
  it("should render Home component", () => {
    const home = render(<Home />);
    expect(home.find("div").length).to.equal(1);
    expect(home.find("a").length).to.equal(2);
    expect(home.find("a")[0].children[0].data).to.equal("Sign up");
    expect(home.find("a")[1].children[0].data).to.equal("Log in");
  });
});
