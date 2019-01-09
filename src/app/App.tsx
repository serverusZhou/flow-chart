import * as React from "react";
import createHoc from "./CreateHoc";

const { Component } = React;

interface IAppProps {}
interface IAppState {}

class Chart extends Component<IAppProps, IAppState> {

  public static create = createHoc;

  public render(): JSX.Element {
    return (
      <div>Hello your head</div>
    );
  }
}

export default Chart;
