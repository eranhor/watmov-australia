import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
        }}>
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              color: 'var(--navy)',
              marginBottom: '16px',
            }}>
              Something went wrong
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}>
              We're sorry, but there was an error loading this page. 
              Please try refreshing or contact us if the problem persists.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '12px 24px',
                  background: 'var(--blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reload Page
              </button>
              <a
                href="mailto:info@watmov.com.au"
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  color: 'var(--navy)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
