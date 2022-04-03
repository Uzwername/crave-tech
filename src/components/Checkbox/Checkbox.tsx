import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LABEL_BOX, LABEL_TEXT_BOX } from './Checkbox.helpers';
import { CheckboxComponentProps } from './Checkbox.types';

const CheckboxInput = ({
  label,
  disabled,
  required,
  input,
  meta,
}: CheckboxComponentProps) => {
  const isDisplayError = meta.error && meta.touched;
  const helper = isDisplayError ? meta.error : undefined;
  
  const checkbox = (
    <Checkbox {...input} disabled={disabled} />
  );
  
  const checkboxLabel = (
    <Box sx={LABEL_TEXT_BOX}>
      {label} {required && '*'}
    </Box>
  );
  
  return (
    <Box>
      <FormControl
        fullWidth
        error={isDisplayError}
      >
        <FormControlLabel
          control={checkbox}
          label={checkboxLabel}
          sx={LABEL_BOX}
        />
        {isDisplayError && (
          <FormHelperText>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default CheckboxInput;
