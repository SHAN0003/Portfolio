export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  WORK = 'work',
  SKILLS = 'skills',
  CONTACT = 'contact',
}