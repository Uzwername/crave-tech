import React, { useEffect } from 'react';
import get from 'lodash/get';
import getValues from 'lodash/values';
import usePrevious from 'use-previous';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check'
import { Field } from 'react-final-form'
import { STARTUP_FORM_KEY } from '../../constants/storage';
import { STARTUP_FORM_GROUPS } from '../../constants/startupForm';
import { joinDotNotation } from '../../utils';
import { setStorageItem } from '../../utils/storage';
import {
  COMMON_FIELD_SETTINGS,
  FORM_BOX,
  FORM_WRAPPER,
  GROUP_HEADING_BOX,
  GROUP_COUNTER_BOX,
  GROUP_CHECK_ICON,
  FORM_ERROR_BOX,
} from './StartupForm.helpers';
import { StartupFormItemGroup, StartupFormItem, StartupFormType } from '../../model/StartupForm/StartupForm';
import { StartupFormComponentProps } from './StartupForm.types';

const StartupForm = ({ values, submitFailed, onFormCompletion }: StartupFormComponentProps) => {
  // Save results in local storage upon progress
  useEffect(() => {
    setStorageItem(STARTUP_FORM_KEY, values);
  }, [values]);
  
  const previousValues = usePrevious(values);
  const extractFieldsValues = (startupForm: StartupFormType): boolean[] => {
    return getValues(startupForm).flatMap(getValues);
  };
  
  // Calculate when to run onFormCompletion
  useEffect(() => {
    if (!values) {
      return;
    }
    
    const isComplete = extractFieldsValues(values).every(checkbox => checkbox);
    const isPreviouslyIncomplete = !previousValues || extractFieldsValues(previousValues).some(checkbox => !checkbox);
    
    if (isComplete && isPreviouslyIncomplete) {
      onFormCompletion();
    }
  }, [values, previousValues]);
  
  const generateFieldGroup = (
    { id: groupId, label, items }: StartupFormItemGroup,
    index: number,
    itemGroups: StartupFormItemGroup[],
  ) => {
    const baseOneIndex = index + 1;
    
    const isPreviousGroupsIncomplete = (currentIndex: number): boolean => {
      const previousGroupIndex = currentIndex - 1;
      const maybePrevGroupId: StartupFormItemGroup['id'] = get(itemGroups, `[${previousGroupIndex}].id`, '');
      const maybePrevGroupItems: StartupFormItem[] = get(itemGroups, `[${previousGroupIndex}].items`, []);
      const isTherePreviousGroup = Boolean(maybePrevGroupItems.length);
      
      const isPreviousGroupIncomplete = isTherePreviousGroup && !maybePrevGroupItems?.every(({ id: prevItemId }) => 
        get(values, joinDotNotation(maybePrevGroupId, prevItemId), false)
      );
      
      // Recursively check all previous groups
      if (!isPreviousGroupIncomplete && currentIndex - 1 >= 0) {
        return isPreviousGroupsIncomplete(currentIndex - 1);
      }
      
      return isPreviousGroupIncomplete;
    };

    
    const isGroupComplete = items.every(({ id }) => get(values, joinDotNotation(groupId, id), false));
    
    return (
      <Box key={groupId} component='fieldset' marginBottom='24px'>
        <Box sx={GROUP_HEADING_BOX}>
          <Box sx={GROUP_COUNTER_BOX}>
            {baseOneIndex}
          </Box>
          <Typography variant='h6' fontWeight='bold' marginRight='20px'>
            {label}
          </Typography>
          {isGroupComplete && (
            <CheckIcon fontSize='large' sx={GROUP_CHECK_ICON} />
          )} 
        </Box>
        <Box>
          {items.map(({ id, ...field }) => {
            const fieldName = joinDotNotation(groupId, id);
            const isDisabled = isPreviousGroupsIncomplete(index);
            
            return (
              <Field
                key={fieldName}
                name={fieldName}
                disabled={isDisabled}
                {...field}
                {...COMMON_FIELD_SETTINGS}
              />
            );
          })}
        </Box>
      </Box>
    );
  };
  
  return (
    <Box component='form' sx={FORM_BOX}>
      <Box sx={FORM_WRAPPER}>
        <Typography variant='h6' fontWeight='bold' marginBottom='16px'>
          My startup progress
        </Typography>
        {STARTUP_FORM_GROUPS.map(generateFieldGroup)}
        {Boolean(submitFailed) && (
          <Box sx={FORM_ERROR_BOX}>
            Submission failed. Please try again.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StartupForm;