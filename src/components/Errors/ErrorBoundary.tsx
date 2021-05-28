import { Component } from "react";
import ErrorComponent from "./ErrorComponent";

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError = () => {
    return { hasError: true } as State;
  };

  render() {
    return this.state.hasError ? <ErrorComponent /> : this.props.children;
  }
}

export default ErrorBoundary;
