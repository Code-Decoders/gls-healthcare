export type InsurancePlan = {
  provider: string;
  plan: string;
  coverage: number;
  planId?: string;
  duration: string;
  price: number;
  description: string;
  createdAt?: Date;
};
