import * as React from "react";
import { render } from "react-dom";
import AppIndex from "../index";

interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render(): JSX.Element {
    return (
      <div>Hello world<AppIndex /></div>
    );
  }
}

render(<App />, document.getElementById("app"));
