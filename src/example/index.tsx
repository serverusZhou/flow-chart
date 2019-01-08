import * as React from "react";
import { render } from "react-dom";
import AppIndex from "../index";

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>Hello world<AppIndex /></div>
    );
  }
}

render(<App />, document.getElementById("app"));
