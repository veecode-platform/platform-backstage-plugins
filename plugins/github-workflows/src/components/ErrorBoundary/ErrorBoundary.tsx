import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useTranslationRef } from '@backstage/core-plugin-api/dist/alpha';
import { githubWorkflowsTranslationRef } from '../../translation';


interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslationRef(githubWorkflowsTranslationRef); 

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
        {t('errorBoundary.alert')}
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
