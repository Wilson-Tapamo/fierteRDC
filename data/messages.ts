export interface InspirationMessage {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const messages: InspirationMessage[] = [
  {
    id: 1,
    title: "Patrice Lumumba",
    description: "Premier Premier ministre de la RDC, symbole de la lutte pour l'indépendance et la dignité africaine.",
    image: "https://images.unsplash.com/photo-1608508644931-21ce0d4fcf59?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Les Léopards",
    description: "L'équipe nationale de football, fierté sportive de la nation, multiple vainqueur de la CAN.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Le Fleuve Congo",
    description: "Deuxième plus grand fleuve du monde, source de vie et de richesse pour l'Afrique centrale.",
    image: "https://images.unsplash.com/photo-1590766740859-62a99f01c8d9?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Les Montagnes Virunga",
    description: "Chaîne de montagnes volcaniques abritant les derniers gorilles de montagne.",
    image: "https://images.unsplash.com/photo-1582649033047-c40bb3f7c37b?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "La Forêt Tropicale",
    description: "Deuxième plus grande forêt tropicale du monde, poumon de l'Afrique.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2572&auto=format&fit=crop"
  }
];