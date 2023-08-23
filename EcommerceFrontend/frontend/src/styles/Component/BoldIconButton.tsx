import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react'

interface BoldIconButtonProps extends IconButtonProps {
  bold?: boolean;
  children: React.ReactNode;
}

const BoldIconButton = ({ bold, children, ...props}: BoldIconButtonProps) => {
  const iconStyle = { fontWeight: bold ? 'bold' : 'normal' };

  return (
    <IconButton {...props} style={iconStyle}>
      {children}
    </IconButton>
  )
}

export default BoldIconButton