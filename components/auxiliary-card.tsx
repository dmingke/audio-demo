"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { AuxiliaryCard as AuxiliaryCardType } from "@/types/card"
import { cn } from "@/lib/utils"
import { LargeImageDisplay } from "./large-image-display"

interface AuxiliaryCardProps {
  deck: AuxiliaryCardType
  onCardSelect: (cardId: string) => void
  selectedCard: string | null
}

export function AuxiliaryCard({ deck, onCardSelect, selectedCard }: AuxiliaryCardProps) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [clickedCard, setClickedCard] = useState<string | null>(null)

  const handleClick = (id: string) => {
    // If clicking the same card, toggle it off
    if (clickedCard === id) {
      setClickedCard(null)
    } else {
      // If clicking a different card, show the new card
      setClickedCard(id)
    }
    onCardSelect(id)
  }

  const bgColorMap = {
    blue: "bg-blue-600",
    yellow: "bg-yellow-500",
    black: "bg-neutral-800",
    green: "bg-green-600",
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 将 event.target 断言为 HTMLElement 类型，确保它具有 closest 方法
      const target = event.target as HTMLElement

      if (clickedCard && !target.closest(".auxiliary-card-container")) {
        setClickedCard(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [clickedCard])

  useEffect(() => {
    // Reset clickedCard when selectedCard changes (i.e., when selecting from a different deck)
    if (selectedCard !== clickedCard) {
      setClickedCard(null)
    }
  }, [selectedCard, clickedCard])

  return (
    <div className="flex flex-inline items-start gap-4 mt-2 auxiliary-card-container">
      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          "transition-all duration-300 ease-in-out shrink-0",
          isActive ? "w-16 h-20" : "w-24 h-24",
          bgColorMap[deck.color] || "bg-primary",
          isActive ? "ring-4 ring-primary shadow-lg" : "hover:ring-2 hover:ring-primary/50",
          "rounded-lg flex items-center justify-center",
        )}
      >
        <span
          className={cn(
            "text-white font-bold transition-all duration-300 ease-in-out",
            isActive ? "text-sm" : "text-lg",
          )}
        >
          {deck.title}
        </span>
      </button>

      {isActive && (
        <div className="flex flex-wrap gap-4 animate-in slide-in-from-left">
          {deck.cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={cn(
                "group relative w-20 h-20 rounded-lg transition-all duration-300 overflow-hidden",
                selectedCard === card.id
                  ? "ring-4 ring-primary shadow-lg scale-105"
                  : "hover:ring-2 hover:ring-primary/50",
              )}
            >
              <Image
                src={card.imageSrc || "/placeholder.svg"}
                alt={card.title}
                fill
                sizes="112px"
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs font-semibold">
                {String(index + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>
      )}
      {clickedCard && (
        <LargeImageDisplay
          images={[
            {
              src: deck.cards.find((card) => card.id === clickedCard)?.patternImage || "",
              alt: `Pattern: ${deck.cards.find((card) => card.id === clickedCard)?.title}`,
            },
            {
              src: deck.cards.find((card) => card.id === clickedCard)?.imageSrc || "",
              alt: deck.cards.find((card) => card.id === clickedCard)?.title || "",
            },
          ].filter((img) => img.src)}
        />
      )}
    </div>
  )
}

