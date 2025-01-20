export interface Card {
    id: string;
    category: 'top' | 'right' | 'bottom' | 'left';
    title: string;
    audioSrc: string;
    singleCardAudio: string;
    imageSrc: string;
    combinationAudios: { 
      [key: string]: string; // For two-card combinations
    };
    tripleAudios: {
      [key: string]: string; // For three-card combinations
    };
  }
  
  export interface CategorySelection {
    [key: string]: string | null; // category -> cardId
  }
  
  export interface AuxiliaryCard {
    id: string;
    title: string;
    color: 'blue' | 'yellow' | 'black' | 'green';
    cards: {
      id: string;
      title: string;
      audioSrc: string;
      patternImage?: string;
      imageSrc: string;
    }[];
  }
  
  