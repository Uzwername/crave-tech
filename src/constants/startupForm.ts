import { StartupFormItemGroup } from "../model/StartupForm/StartupForm";

export const STARTUP_FORM_GROUPS: StartupFormItemGroup[] = [
  {
    id: 'foundation',
    label: 'Foundation',
    items: [
      {
        id: 'virtual-office',
        label: 'Setup virtual office',
      },
      {
        id: 'mission-and-vision',
        label: 'Setup mission & vision',
      },
      {
        id: 'pick-business-name',
        label: 'Select business name',
      },
      {
        id: 'purchase-domains',
        label: 'Buy domains',
      },
    ],
  },
  {
    id: 'discovery',
    label: 'Discovery',
    items: [
      {
        id: 'create-roadmap',
        label: 'Create roadmap',
      },
      {
        id: 'competitor-analysis',
        label: 'Competitor analysis',
      }
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    items: [
      {
        id: 'release-marketing-website',
        label: 'Release marketing website',
      },
      {
        id: 'release-mvp',
        label: 'Release MVP',
      }
    ],
  },
];
