import React, { useState } from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import axios from 'axios';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Form } from 'react-final-form';
import { STARTUP_FORM_GROUPS } from '../../constants/startupForm';
import StartupFormComponent from '../../components/StartupForm/StartupForm';
import {
  RANDOM_FACT_BOX,
  getStoredFormState,
  calculateDefaultFormState,
} from './StartupForm.helpers';
import { StartupFormType } from "../../model/StartupForm/StartupForm";

const StartupForm = () => {
  const [apiFact, setApiFact] = useState<string>('');
  const initialValues = getStoredFormState() || calculateDefaultFormState(STARTUP_FORM_GROUPS);
  
  const handleFormCompletion = async () => {
    const RANDOM_FACTS_API_ENTRY = 'https://uselessfacts.jsph.pl/random.json'; 
    
    const { data: factData } = await axios.get(RANDOM_FACTS_API_ENTRY);
    const factText = get(factData, 'text', '');
    
    if (factText) {
      setApiFact(factText)
    }
  };
  
  return (
    <>
      <Form<StartupFormType>
        initialValues={initialValues}
        onSubmit={noop}
      >
        {props => <StartupFormComponent {...props} onFormCompletion={handleFormCompletion} />}
      </Form>
      {Boolean(apiFact) && (
        <Box sx={RANDOM_FACT_BOX}>
          <Alert severity='info'>
            <AlertTitle>Random Fact</AlertTitle>
            {apiFact}
          </Alert>
        </Box>
      )}
    </>
  );
};

export default StartupForm;