/* eslint-disable import/prefer-default-export */
declare module 'react-dom/client' {
  import { ReactElement } from 'react';
  import { Container } from 'react-dom';

  function createRoot(container: Container): {
    render: (element: ReactElement) => void;
    unmount: () => void;
  };

  export { createRoot };
}
