import * as React from "react";
import create from "./create";

import * as styles from "./index.scss";

console.log("stylesstyles", styles);
const { Component } = React;

interface IAppProps {}
interface IAppState {}

class Chart extends Component<IAppProps, IAppState> {

  public static create = create;

  public render(): JSX.Element {
    return (
      <section
        className={styles["chart-context"]}
      >
        <aside>this is the lest part</aside>
      </section>
    );
  }
}

export default Chart;
