import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import Nav from "../components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let nav;
  // Needs to be class component
  beforeEach(() => {
    nav = shallow(<Nav />);
    expect(isReact.classComponent(Nav)).toBeTruthy();
  });

  it('Should have four links <Link to="" />.', () => {
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
  });

  it('The first link should be "Home" and rout to "/"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Link).at(0).prop("to")).toEqual("/");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('The second link should be "Create Pokemon" and should route to "/pokemon/create"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/pokemon/create");
    expect(nav.find(Link).at(1).text()).toEqual("Create Pokemon");
  });

  it('The third link should be "Pokemons" and should route to "/pokemons/"', () => {
    expect(nav.find(Link).at(2).prop("to")).toEqual("/pokemons/");
    expect(nav.find(Link).at(2).text()).toEqual("Pokemons");
  });

  it('The fourth link should be "Types" and should route to "/types"', () => {
    expect(nav.find(Link).at(3).prop("to")).toEqual("/types");
    expect(nav.find(Link).at(3).text()).toEqual("Types");
  });

});