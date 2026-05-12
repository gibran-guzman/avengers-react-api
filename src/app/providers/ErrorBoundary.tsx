import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error boundary caught an error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell">
          <div className="app-shell__content">
            <section className="state-message" role="alert">
              <h1>Something went wrong</h1>
              <p>The interface could not recover from an unexpected error.</p>
              <a className="button button--primary" href="/">
                Return home
              </a>
            </section>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
