import * as React from "react";

const { Component } = React;
interface IAppProps {}
interface IAppStates {}

const create = (WrappedComponent: any) => {
    return class extends Component<IAppProps, IAppStates> {
        public saySomething = () => {
            console.log("saySomething");
        }
        public render(): JSX.Element {
            return (
                <WrappedComponent
                    {...this.props}
                    saySomething = {this.saySomething}
                />
            );
        }
    };
};

export default create;
