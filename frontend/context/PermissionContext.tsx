import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PermissionContextType {
  hasAccess: boolean;
  setHasAccess: (access: boolean) => void;
  grantAccess: () => void;
  revokeAccess: () => void;
  toggleAccess: () => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

interface PermissionProviderProps {
  children: ReactNode;
  initialAccess?: boolean;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ 
  children, 
  initialAccess = false 
}) => {
  const [hasAccess, setHasAccess] = useState<boolean>(initialAccess);

  const grantAccess = () => setHasAccess(true);
  const revokeAccess = () => setHasAccess(false);
  const toggleAccess = () => setHasAccess(prev => !prev);

  const value: PermissionContextType = {
    hasAccess,
    setHasAccess,
    grantAccess,
    revokeAccess,
    toggleAccess,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};

export const useAccess = () => {
  const { hasAccess } = usePermission();
  return hasAccess;
};
