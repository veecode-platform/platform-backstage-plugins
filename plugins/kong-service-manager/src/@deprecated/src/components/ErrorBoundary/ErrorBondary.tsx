import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';



interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
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
            href="https://github.com/veecode-platform/platform-backstage-plugins/plugins/kong-service-manager"
            target="_blank"
            rel="noopener noreferrer"
          >
            @veecode/kong-service-manager
          </a>
        </strong>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;