export interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  slug: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  organization: string;
}

export interface IRegistrationModal {
  show: boolean;
}
