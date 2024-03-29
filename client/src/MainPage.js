import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const [showRoleButtons, setShowRoleButtons] = useState(false);

  const navigateToDetailsAsOwner = () => navigate('/shopping-list/1', { state: { isOwner: true } });
  const navigateToDetailsAsInvited = () => navigate('/shopping-list/1', { state: { isOwner: false } });

  return (
    <div className="main-page"> {/* Add this class */}
      Main Page
      {showRoleButtons ? (
        <>
          <button onClick={navigateToDetailsAsOwner}>Owner</button>
          <button onClick={navigateToDetailsAsInvited}>Invited User</button>
        </>
      ) : (
        <button onClick={() => setShowRoleButtons(true)}>Go to Shopping List 1</button>
      )}
    </div>
  );
}

export default MainPage;

