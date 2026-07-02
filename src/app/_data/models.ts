import { Timestamp } from "firebase/firestore";

export interface HeroTileData {
    id?: string;
    title: string;
    chips: Chip[];
    
}

export interface Chip {
    id: string;
    name: string;
    type?: 'light' | 'dark';
}

export interface Project {
    id?: string;
    displayType: 'writeup' | 'demo';
    title: string;
    subtitle?: string;
    description?: string;
    urlSlug?: string;
    isLive: boolean;
}

export interface Certification {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    chips: Chip[],
    date: Timestamp,
    link: string
}

export interface Availability {
    id: string;
    available: boolean;
    roles: string[]
    location: string;
}

export interface HeroTileInfo {
    id: string;
    title: string;
    description: string;
}