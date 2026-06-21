import { useEffect } from 'react';
import template from './template.html?raw';
import initSite from './initSite';

function App() {
  // initSite wires up all DOM behavior and returns a cleanup function,
  // which is exactly what useEffect expects as its return value.
  useEffect(() => initSite(), []);

  return <div dangerouslySetInnerHTML={{ __html: template }} />;
}

export default App;