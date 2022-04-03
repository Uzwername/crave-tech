export interface StartupFormItem {
  id: string;
  label: string;
}

export interface StartupFormItemGroup {
  id: string;
  label: string;
  items: StartupFormItem[];
}

export type StartupFormType = Record<string, Record<string, boolean>>;