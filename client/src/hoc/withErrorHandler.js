import React from "react";

import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (Component, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.clearErrorHandler = this.clearErrorHandler.bind(this);
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    clearErrorHandler() {
      this.setState({
        error: null,
      });
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={this.clearErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Component {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
