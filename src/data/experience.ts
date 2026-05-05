import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'cpcon',
    companyKey: 'experience:cpcon.company',
    roleKey: 'experience:cpcon.role',
    descKey: 'experience:cpcon.desc',
    startDate: '2024-03',
    endDate: null,
    current: true,
  },
  {
    id: 'interasoft',
    companyKey: 'experience:interasoft.company',
    roleKey: 'experience:interasoft.role',
    descKey: 'experience:interasoft.desc',
    startDate: '2023-01',
    endDate: '2024-02',
    current: false,
  },
];
