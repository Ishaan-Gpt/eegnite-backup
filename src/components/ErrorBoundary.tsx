import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-orange text-primary-foreground p-8">
          <img src={require("@/assets/logo.png")} alt="Logo" className="w-24 h-24 mb-6 rounded-lg shadow-lg" />
          <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
          <p className="mb-4 text-lg">An unexpected error occurred. Please try again or contact support if the problem persists.</p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow hover:bg-primary/90 transition"
          >
            Try Again
          </button>
          <div className="mt-6 text-sm opacity-70">
            {this.state.error?.message}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
} 