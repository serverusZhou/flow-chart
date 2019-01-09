
import * as React from "react";
import Chart from "../index";

interface IAppProps {
    handleClick: () => void;
}
class Example extends React.Component<IAppProps> {
    public constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
      return (
        <div>
            <Chart />
        </div>
      );
    }
  }

export default Chart.create(Example);
