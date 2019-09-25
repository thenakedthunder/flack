//import React from 'react';
//import ReactDOM from 'react-dom';
//import App from './App';
//import DisplayNameDialog from './DisplayNameDialog/DisplayNameDialog';

//import { render, cleanup } from "@testing-library/react";
//import "@testing-library/jest-dom/extend-expect"


//afterEach(cleanup);

//// -------------- MAIN APP --------------

//it("matches snapshot", () => {
//    const { asFragment } = render(<App />);
//    expect(asFragment()).toMatchSnapshot();
//});


//it('renders without crashing', () => {
//  const div = document.createElement('div');
//  ReactDOM.render(<App />, div);
//  ReactDOM.unmountComponentAtNode(div);
//});


//// --------- DisplayNameDialog ----------

//it("matches snapshot", () => {
//    const { asFragment } = render(<DisplayNameDialog />);
//    expect(asFragment()).toMatchSnapshot();
//});


//it('renders without crashing', () => {
//    const div = document.createElement('div');
//    ReactDOM.render(<DisplayNameDialog />, div);
//    ReactDOM.unmountComponentAtNode(div);
//});