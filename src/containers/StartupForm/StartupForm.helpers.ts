import set from 'lodash/set';
import { STARTUP_FORM_KEY } from '../../constants/storage';
import { joinDotNotation } from "../../utils";
import { getStorageItem } from '../../utils/storage';
import { StartupFormItemGroup, StartupFormType } from "../../model/StartupForm/StartupForm";

export const RANDOM_FACT_BOX = {
  width: '40%',
  minWidth: '180px',
  margin: '0 auto 20px'
};

export const getStoredFormState = (): StartupFormType | null => getStorageItem(STARTUP_FORM_KEY);

export const calculateDefaultFormState = (formItemGroups: StartupFormItemGroup[]): StartupFormType => formItemGroups.flatMap(
  ({ id: groupId, items }) =>
    items.map(({ id }) => joinDotNotation(groupId, id))
  ).reduce(
    (accumulator, fieldName) => set(accumulator, fieldName, false),
    {}
  );
