import type { FormRenderProps } from 'react-final-form';
import { StartupFormType } from "../../model/StartupForm/StartupForm";

export interface StartupFormComponentProps extends FormRenderProps<StartupFormType> {
  onFormCompletion: () => unknown;
}
