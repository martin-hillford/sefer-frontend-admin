/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Main from './Main';
import Error from './pages/Support/Error/Error';

class App extends React.Component<any, { message : any}> {
  constructor(props : any) {
    super(props);
    this.state = { message: null };
    this.setError = this.setError.bind(this);

    window.onerror = (message, source, lineNumber, columnNumber, object) => {
      this.setError(this.getMessage(object));
    };

    window.onunhandledrejection = event => {
      this.setError(this.getMessage(event.reason));
      return true;
    };
  }

  setError(error : any) {
    this.setState({ message: error });
  }

  getMessage(error : any) : any {
    if (error?.error) return this.getMessage(error.error);
    if (error?.message) return error.message as string;
    return undefined;
  }

  render() {
    const { state } = this;
    switch (state.message) {
      case null:
        return <Main />;
      case '401 Unauthorized':
        return <Error>401 Unauthorized</Error>;
      default:
        if (state.message as string) return <Error>{state.message}</Error>;
        return <Error>An unknown error has occurred.</Error>;
    }
  }
}

export default App;
