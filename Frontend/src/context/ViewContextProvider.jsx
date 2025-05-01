import { useState } from 'react';
import ViewContext from './ViewContext';

const ViewContextProvider = ({ children }) => {
  const [view, setView] = useState('teamLeadLogin'); // Use string or enum as appropriate

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
