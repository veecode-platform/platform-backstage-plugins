import React from 'react';
import Alert from '@material-ui/lab/Alert';


interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      // eslint-disable-next-line no-console
      console.error('Unhandled Promise Rejection:', event.reason);
      setHasError(true);
    };

    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);

  if (hasError) {
    return (
      <Alert severity="error">
        Something went wrong. Please make sure that you installed:
        <strong>
          <a
            href="https://github.com/veecode-platform/platform-backstage-plugins/plugins/github-workflows"
            target="_blank"
            rel="noopener noreferrer"
          >
            @veecode/github-workflows
          </a>
        </strong>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;