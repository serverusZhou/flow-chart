
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
        const{ saySomething } = this.props;
        return (
        <>
            <Chart />
            <button onClick={saySomething}>saysomething</button>
        </>
        );
    }
}

export default Chart.create(Example);
