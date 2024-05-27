import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const RoleSwitcher: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isAdmin} onChange={handleRoleChange} />}
        label={isAdmin ? 'Admin' : 'User'}
      />
    </div>
  );
};

export default RoleSwitcher;