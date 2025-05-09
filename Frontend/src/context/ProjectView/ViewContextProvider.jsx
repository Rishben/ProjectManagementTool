import { useState } from 'react';
import ProjectViewContext from './ViewContext';

const ViewContextProvider = ({ children }) => {
  const [view, setView] = useState('task');

  return (
    <ProjectViewContext.Provider value={{ view, setView }}>
      {children}
    </ProjectViewContext.Provider>
  );
};

export default ViewContextProvider;
