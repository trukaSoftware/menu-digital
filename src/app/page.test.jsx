import { render, screen } from '@testing-library/react';

import Page from './page';

describe('page', () => {
  it('test example', () => {
    render(<Page />);
    expect(screen.getByText(/Docs/i)).toBeInTheDocument();
  });
});
