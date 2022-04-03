import type { FieldRenderProps } from 'react-final-form';

export interface CheckboxComponentProps extends FieldRenderProps<boolean> {
  label: string | JSX.Element;
  required: boolean;
}
