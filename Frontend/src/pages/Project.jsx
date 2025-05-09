import React, { useContext } from 'react';
import Header from '../components/Header';
import LeftNavbar from '../components/LeftNavbar';
import ViewContext from '../context/ProjectView/ViewContext';
import DirectMessages from './DirectMessages';

const Project = () => {
  const { view, setView } = useContext(ViewContext);
  
  const renderComponent = () => {
    switch (view) {
      case 'tasks':
        return <div className="h-full overflow-auto">Tasks Content</div>;
      case 'groupChat':
        return <div className="h-full overflow-auto">Group Chat Content</div>;
      case 'directMessages':
        return <DirectMessages />;
      case 'drawing':
        return <div className="h-full overflow-auto">Drawing Content</div>;
      default:
        return <div className="h-full overflow-auto">Select a view</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <Header handleLogout={() => console.log('Logout')} />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <LeftNavbar />
        </div>
        
        <div className="flex-1 h-full">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Project;