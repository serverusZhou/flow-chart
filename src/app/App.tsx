import * as React from "react";
import create from "./create";

import * as styles from "./index.scss";

interface IAppProps {}
interface IAppState {}

class Chart extends React.Component<IAppProps, IAppState> {

  public static create = create;

  public render(): JSX.Element {
    return (
      <section
        className={styles.chartContext}
      >
        <section>
          this is the left part
        </section>
        <article>
          <header></header>
        </article>
      </section>
    );
  }
}

export default Chart;
