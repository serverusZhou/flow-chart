import * as React from "react";

const { Component } = React;

const createHoc = (WrappedComponent: any) => class extends Component {

    public render() {
        return (
            <WrappedComponent
                {...this.props}
            />
        );
    }
  };
export default createHoc;
