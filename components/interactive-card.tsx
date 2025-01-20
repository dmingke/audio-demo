'use client'

import Image from 'next/image'
import { Card } from '../types/card'

interface InteractiveCardProps {
  key: string 
  card: Card
  isSelected: boolean
  onSelect: (card: Card) => void
}

export function InteractiveCard({ card, isSelected, onSelect }: InteractiveCardProps) {
  return (
    <button
      onClick={() => onSelect(card)}
      className={`
        relative w-[calc(20vmin)] h-[calc(20vmin)] max-w-[160px] max-h-[160px]
        rounded-lg transition-all duration-300 ease-in-out overflow-hidden
        ${isSelected 
          ? 'ring-4 ring-primary shadow-lg scale-105' 
          : 'hover:ring-2 hover:ring-primary/50'
        }
      `}
    >
      <Image
        src={card.imageSrc}
        alt={card.title}
        fill
        className="object-cover"
      />
      <div className={`
        absolute inset-0 flex items-center justify-center
        bg-black/40 backdrop-blur-[2px] transition-opacity
        ${isSelected ? 'opacity-0' : 'opacity-100'}
      `}>
        <span className="text-sm font-medium text-white">
          {card.title}
        </span>
      </div>
    </button>
  );
};

