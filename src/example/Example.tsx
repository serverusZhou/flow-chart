
import * as React from "react";
import Chart from "../index";

interface IAppProps {
    saySomething: () => void;
}
class Example extends React.Component<IAppProps> {
    public constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
      return (
        <div>
            <Chart />
            <button onClick={this.props.saySomething}>saysomething</button>
        </div>
      );
    }
  }

export default Chart.create(Example);
