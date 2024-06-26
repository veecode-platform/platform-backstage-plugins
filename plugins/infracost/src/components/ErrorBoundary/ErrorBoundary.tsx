import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { PLUGIN_DOCS } from '../../utils/constants/infracost';


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
            href={PLUGIN_DOCS}
            target="_blank"
            rel="noopener noreferrer"
          >
            @veecode-platform/backstage-plugin-infracost
          </a>
        </strong>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;