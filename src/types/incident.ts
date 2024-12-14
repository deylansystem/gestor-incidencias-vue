export interface Incident {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IncidentFormMode = 'create' | 'edit';