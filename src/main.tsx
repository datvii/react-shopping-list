import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from 'react-error-boundary';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary
			FallbackComponent={() => (
				<div>
					<h1>Something went wrong.</h1>
				</div>
			)}
			onError={(error, errorInfo) => {
				console.error('Error caught by error boundary:', error, errorInfo);
			}}
		>
			<App />
		</ErrorBoundary>
	</StrictMode>
);
