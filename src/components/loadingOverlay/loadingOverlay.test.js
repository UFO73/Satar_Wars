import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoadingOverlay from './loadingOverlay';

describe('LoadingOverlay component', () => {
  test('renders loading overlay when isLoading is true', async () => {
    render(<LoadingOverlay isLoading={true} />);
    const loadingOverlay = screen.getByText('Loading...'); // Get loading overlay by text
    expect(loadingOverlay).toBeInTheDocument(); // Ensure loading overlay is rendered
  });

  test('hides loading overlay when isLoading is false and progress reaches 100%', async () => {
    render(<LoadingOverlay isLoading={false} />);

    // Wait for loading overlay to hide after a delay
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(); // Ensure loading overlay is not in the document
    }, { timeout: 10000 });
  });

  test('shows loading progress bar', async () => {
    render(<LoadingOverlay isLoading={true} />);
    const progressBar = screen.getByTestId('progress-bar'); // Get progress bar by test ID
    expect(progressBar).toBeInTheDocument(); // Ensure progress bar is rendered

    // Ensure progress bar width is 100%
    await waitFor(() => {
      expect(progressBar).toHaveStyle('width: 100%');
    }, { timeout: 10000 });
  });
});
