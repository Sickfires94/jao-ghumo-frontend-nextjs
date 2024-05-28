import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const RoleSwitcher: React.FC = () => {
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOwner(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isOwner} onChange={handleRoleChange} />}
        label={isOwner ? 'Owner' : 'User'}
      />
    </div>
  );
};

export default RoleSwitcher;