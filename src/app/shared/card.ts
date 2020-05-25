export interface ICard {
  fullName: string;
  title: string;
  email: string;
  phone: number;
  skills: Array<{
    name: string;
    strength: number;
  }>;
  experience: Array<{
    fromDate: string;
    toDate: string;
    orgName: string;
    details: string;
    isRelevant: boolean;
  }>;
}
