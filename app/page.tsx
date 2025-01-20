'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { InteractiveCard } from '@/components/interactive-card'
import  AudioPlayer  from '@/components/audio-player'
import { AuxiliaryCard } from '@/components/auxiliary-card'
import type { Card, CategorySelection, AuxiliaryCard as AuxiliaryCardType } from '@/types/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Mode = 'green' | 'blue' | 'red'

const cards: Card[] = [
  // Right cards
  { 
    id: 'r1', 
    category: 'right', 
    title: '墨墨', 
    audioSrc: '/audio/墨墨.mp3',
    singleCardAudio: '/audio/墨墨单卡.mp3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%A2%A8%E5%A2%A8-E3jiF5aLsR3kiXqxCAKulnVh76SkjL.jpeg',
    combinationAudios: {
      'l2': '/audio/墨墨+魔法.MP3',
      'l1': '/audio/墨墨+未来.MP3',
      'b2': '/audio/墨墨+小镇.MP3',
      'b1': '/audio/墨墨+森林.MP3'
    },
    tripleAudios: {
      'b1l2': '/audio/墨墨+魔法+森林.MP3',
      'b2l2': '/audio/墨墨+小镇+魔法.MP3',
      'b1l1': '/audio/墨墨+森林+未来.MP3',
      'b2l1': '/audio/墨墨+未来+小镇.MP3'
    }
  },
  { 
    id: 'r2', 
    category: 'right', 
    title: '闹闹', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9-jc8S0bqVUGJ9U5PDU0vmh0frDoeY3f.mp3',
    singleCardAudio: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9%E5%8D%95%E5%8D%A1-0f14CWfGpbbDydLox8NACGhayzmz4x.MP3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9%E5%9B%BE%E7%89%87-lDmqtItGn7rmlNpmnlAwoO7ixlWrxD.jpeg',
    combinationAudios: {
      'l2': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E9%AD%94%E6%B3%95-ZCQ0L4UG3xRTZW1nfvi0pZbTGQG5cP.MP3',
      'l1': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E6%9C%AA%E6%9D%A5-2UJ84X1fN9VqVx96qGnarQYZo1yhaY.MP3',
      'b2': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E5%B0%8F%E9%95%87-n3ALiTl2Vvi7JOBI9tap4GfbVbEUXj.MP3',
      'b1': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E6%A3%AE%E6%9E%97-d6iHOQG7vdW2pIPXJJeZ4qsgdQMUJN.MP3'
    },
    tripleAudios: {
      'b2l1': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E6%9C%AA%E6%9D%A5+%E5%B0%8F%E9%95%87v1.1-uFOip5EXhZuKSdKozchadHVoxh8ucl.MP3',
      'b1l2': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E9%AD%94%E6%B3%95+%E6%A3%AE%E6%9E%97v1.1-mfFTRVjJThduVz48ay1j38OuyYL9n1.MP3',
      'b1l1': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E6%9C%AA%E6%9D%A5+%E6%A3%AE%E6%9E%97v1.1-5ovnnSP8VGiPgS0BbrcWjIjfpYQwdf.MP3',
      'b2l2': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%97%B9%E9%97%B9+%E9%AD%94%E6%B3%95+%E5%B0%8F%E9%95%87-9jX6ym9PcVIp1EvEPWtX7ipq0XQuN5.MP3',
    }
  },
  // Bottom cards
  { 
    id: 'b1', 
    category: 'bottom', 
    title: '森林', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%A3%AE%E6%9E%97-iPFGOsGRw4nKhGmcoLkk7rPvxAtEj1.mp3',
    singleCardAudio: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%A3%AE%E6%9E%97%20(1)-dIMu9iQiIjKSPMHIbAcjrdh1wTmFui.MP3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%A3%AE%E6%9E%97-ms8pC7ekOHUDULaJghKVqMmaA9HfrE.jpeg',
    combinationAudios: {
      'l1': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E6%9D%A5+%E6%A3%AE%E6%9E%97-E46eN44U4MR88Dq0Or8rRZhk9t7rXf.MP3',
      'l2': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AD%94%E6%B3%95+%E6%A3%AE%E6%9E%97+%E9%BE%99+%E6%88%90%E8%AF%AD-YAuw7N2ZQJMVgOZztFY64mXz2dP5Uw.MP3'
    },
    tripleAudios: {}
  },
  { 
    id: 'l1', 
    category: 'left', 
    title: '未来', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E6%9D%A5-n35T3DmbabQVFaM6WMplcn7SlA5k8h.MP3',
    singleCardAudio: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E6%9D%A5%20(1)-UyiKyt9O6xiavmREx0bdnNmAhuSBvT.MP3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E6%9D%A5-JQWlxqgjc3rTuAxzooQTM2GVyTfNy6.jpeg',
    combinationAudios: {},
    tripleAudios: {}
  },
  { 
    id: 'b2', 
    category: 'bottom', 
    title: '小镇', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%B0%8F%E9%95%87-ECgmUzWN0AGsLJQjvGg8PhdTLsdTHq.MP3',
    singleCardAudio: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%B0%8F%E9%95%87%20(1)-cQXoSVYm3ujvYDZjCwMiDOMTYOoyCu.MP3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%B0%8F%E9%95%87-LWDufBiQfpJiekiOd4IaXiFLJ0Ho63.jpeg',
    combinationAudios: {
      'l1': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E6%9D%A5+%E5%B0%8F%E9%95%87-VMoau7IsE9H5el0xKHcQ2jozxIsRlF.MP3',
      'l2': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AD%94%E6%B3%95+%E5%B0%8F%E9%95%87-QHZUesvSOMkIVxXbfVuTxy6jOHVkn0.MP3'
    },
    tripleAudios: {}
  },
  { 
    id: 'l2', 
    category: 'left', 
    title: '魔法', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AD%94%E6%B3%95-MF2UYy28WLbhfnNAPxpnFzBmqHbasm.mp3',
    singleCardAudio: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AD%94%E6%B3%95%20(1)-GQtJkXevxZLaP98LzpeHPfY9KJNxE0.MP3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AD%94%E6%B3%95-Gnd0RS5P01PABZd4lFFyAHYgzkb2ui.jpeg',
    combinationAudios: {},
    tripleAudios: {}
  },
]

const auxiliaryCards: AuxiliaryCardType[] = [
  { id: 'idiom', title: '成语', color: 'blue', cards: [
    { 
      id: 'idiom1', 
      title: '守株待兔', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%AE%88%E6%A0%AA%E5%BE%85%E5%85%94-BAARJOVZxLz4ju4vS2jYkCTiYfZmrm.MP3', 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%AE%88%E6%A0%AA%E5%BE%85%E5%85%94.jpg-oFYwYQW9fDOuGvC3IP0bU1A14dp7fg.jpeg' 
    },
    { 
      id: 'idiom2', 
      title: '亡羊补牢', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%BA%A1%E7%BE%8A%E8%A1%A5%E7%89%A2-tYQwpxjFXHqxwWy8r6NeFrUt9QGJ8r.MP3', 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%BA%A1%E7%BE%8A%E8%A1%A5%E7%89%A2.jpg-0GRLifwo1njUbFhIfrCCbt4nvqMhu7.jpeg' 
    },
    { 
      id: 'idiom3', 
      title: '一鸣惊人', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%B8%80%E9%B8%A3%E6%83%8A%E4%BA%BA-j2JobSmxedgW768phO1CoaxRmgZv6I.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%B8%80%E9%B8%A3%E6%83%8A%E4%BA%BA.jpg-z24Zln6rnIdf5g3Mq8e6tjHM4B6vNE.jpeg' 
    },
    { 
      id: 'idiom4', 
      title: '画龙点睛', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%94%BB%E9%BE%99%E7%82%B9%E7%9D%9B-GnhqHL9PuKXI2EFvysrq9Za2qUaMga.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%94%BB%E9%BE%99%E7%82%B9%E7%9D%9B.jpg-YNaohi8kUsdUkTbpIvAs7MOpVEHDZ9.jpeg' 
    },
  ]},
  { id: 'science', title: '科普', color: 'yellow', cards: [
    { 
      id: 'science1', 
      title: '科普1', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE01-xAPPp83VcAXyuuRVn2k549u6dM4372.MP3', 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE01-2g8z1Zp2Zf96CJuffQEg5Q5NSJTVf3.jpeg'
    },
    { 
      id: 'science2', 
      title: '科普2', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE02-J09WXQ9WOCZCz6hFwu40h942z65lnj.MP3', 
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE02-zoNRHnEtTHoKgFKIjw7vLEBUqdfVd1.jpeg' 
    },
    { 
      id: 'science3', 
      title: '科普3', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE03-dQrYmLhrNLzZIfDFpQtVAwhDnQnspd.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE03-vMnCB35bWbrgWcAW5af2FHgUV4pBie.jpeg'
    },
    { 
      id: 'science4', 
      title: '科普4', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE04-PYT0kDGboIixyXXHtdCFdnYpdG6QyK.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%A7%91%E6%99%AE04-sym3yIsm9KoXh7eRDS1RmzGluNRuZO.jpeg'
    }
  ]},
  { id: 'poem', title: '古诗', color: 'black', cards: [
     { 
      id: 'poem1', 
      title: '绝句', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%BB%9D%E5%8F%A5-AAdLiP7DXlEeCPKue3cM9Mv8WSjrLW.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%BB%9D%E5%8F%A5-VuzBtv04de6cb1ETthEv7GzeLY8Fty.jpeg'
    },
    { 
      id: 'poem2', 
      title: '春晓', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%98%A5%E6%99%93-SfxSgiQZJIXEFEmt5uVWxMR8ikNWtP.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%98%A5%E6%99%93-i9gWP0UeDbeoYN2h7NlxhMuYgfYvIi.png'
    },
    { 
      id: 'poem3', 
      title: '江雪', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%B1%9F%E9%9B%AA-YeBafSejY3NthjuQpsSNcyFar1BiUX.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%B1%9F%E9%9B%AA-w5IZrOQm3b7CXKCNX3vXmT3Tsq5xg4.png'
    },
    { 
      id: 'poem4', 
      title: '游子吟', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%B8%B8%E5%AD%90%E5%90%9F-Zj5fHrAHURKsKauZZ8r0bLDc0RjH1F.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%B8%B8%E5%AD%90%E5%90%9F-1q5AOjh5sK2vk4zXtrcTHZwxUNQ2xf.png'
    },
    { 
      id: 'poem5', 
      title: '咏鹅', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%92%8F%E9%B9%85-UOKjHGcxkrt2QTWkA9Y20UfuORNojn.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%92%8F%E9%B9%85-J4q28cn7pawfWkrNrttrXVttI3yrtB.png'
    },
    { 
      id: 'poem6', 
      title: '晓出净慈寺送林子方', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%99%93%E5%87%BA%E5%87%80%E6%85%88%E5%AF%BA%E9%80%81%E6%9E%97%E5%AD%90%E6%96%B9-5HGw4in0Mp4KM7FQ2QZYMFXwYGLeAo.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%99%93%E5%87%BA%E5%87%80%E6%85%88%E5%AF%BA%E9%80%81%E6%9E%97%E5%AD%90%E6%96%B9-TCipJbvVd3dRpS6XLHI1AiI32E9FSN.webp'
    },
    { 
      id: 'poem7', 
      title: '金缕衣', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%87%91%E7%BC%95%E8%A1%A3-L2rNDJ3HaG4282f5wS9kxmduw6PBBb.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%87%91%E7%BC%95%E8%A1%A3-g1vbWtYz5EVEjE1fSHEeQs0x0O6Pq3.webp'
    },
    { 
      id: 'poem8', 
      title: '春夜喜雨', 
      audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%98%A5%E5%A4%9C%E5%96%9C%E9%9B%A8-llEkMfQ7ERIv5YtErEYbuBPPFHb08S.MP3',
      imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%98%A5%E5%A4%9C%E5%96%9C%E9%9B%A8-JaDUYNFuaMzTCBuYD7belwWTw4JHDl.jpeg'
    },
  ]},
  { id: 'english', title: '英语', color: 'green', cards: [
  { 
    id: 'english1', 
    title: '英语1', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD01-R8W2XX1hnR9TCzz4PYm6CoXKpFaGdd.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD01-jrDPaKO1MHkQNA17o06GHKxKanQ1jh.png'
  },
  { 
    id: 'english2', 
    title: '英语2', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD02-OKyi4gknkXawmWSdenDVKBFtJkgUca.MP3',
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD02.1-2uKtnJvlDB21N4b5boBWSsDuMcKsby.png',
    patternImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD02.2-0YVPyAZSijY0gGAHbL9FvUcSaVS5l3.png'
  },
  { 
    id: 'english3', 
    title: '英语3', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD03-jGZLxY3PNeXevcx5DQAOojbVKgJCmd.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD03-INGaVYXoRYzoVXwZx7Ev016BP7OfAs.png' 
  },
  { 
    id: 'english4', 
    title: '英语4', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD04-i0SkMVzWhVFVvowX1TaF1rdWs6tCb6.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD04.1-1d12Mu7Mqnb86Vr2A5EThxw3T3HNEZ.png',
    patternImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD04.2-M6iL2cXm8MVvVtoyLBtytID0IuYLCc.png', 
  },
  { 
    id: 'english5', 
    title: '英语5', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD05-PY2h2mjhdbFzORRhKGRHMBwAiiYooN.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD05-hw3KxrRFqNdmt9ZhSx6qYIEysGWl7H.png' 
  },
  { 
    id: 'english6', 
    title: '英语6', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD06-XrwnU1CAOfWWfLgaJjYj2SZOBpusC3.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD06.1-LZDrOFftkdOTXe96CuEWY3drxBSxsF.png',
    patternImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD06.2-CrVGjPOLGbxCYOLWDPUOB1Q8XDyHCr.png', 
  },
  { 
    id: 'english7', 
    title: '英语7', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD07-40zeqaUrUSJdGRf2SOP7Z5yElNnall.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD07-TNj7QyWnow61XpDjy2t1mnPLXp2JC3.png' 
  },
  { 
    id: 'english8', 
    title: '英语8', 
    audioSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD08-l1HUmByz7StXx0ntOJmM5XLzT8Ac0U.MP3', 
    imageSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD08.1-susuvXo5tMxigPG65fXqZBGZ1XWyak.png',
    patternImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%8B%B1%E8%AF%AD08.2-puZjY0x2iHE2ky09ZJ1x8xXh80IWEa.png',
  },
  ]},
]

const modeAudios = {
  'green': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5B%E7%83%AD%E7%82%B9%E6%92%AD%E6%8A%A5%5D%E5%BD%93%E5%89%8D%E6%98%AF%E7%BB%BF%E8%89%B2......%E6%8B%A9%E4%B8%89%E5%BC%A0%E5%8D%A1%E7%89%87-1AoehmmpEbEIvEsbVvNogCh0bF3uxI.mp3',
  'blue': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5B%E7%83%AD%E7%82%B9%E6%92%AD%E6%8A%A5%5D%E5%BD%93%E5%89%8D%E6%98%AF%E8%93%9D%E8%89%B2......%E6%8B%A9%E4%B8%A4%E5%BC%A0%E5%8D%A1%E7%89%87-SOYzHjZTNe0GCQDoSFw1P2ADwIDdEZ.mp3',
  'red': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5B%E7%83%AD%E7%82%B9%E6%92%AD%E6%8A%A5%5D%E5%BD%93%E5%89%8D%E6%98%AF%E7%BA%A2%E8%89%B2......%E6%8B%A9%E4%B8%80%E5%BC%A0%E5%8D%A1%E7%89%87-Tykb0IaaRFDvg5Wamv3IQ4oATBXO4X.mp3'
}



export default function Home() {
  const [mode, setMode] = useState<Mode>('red')
  const [selections, setSelections] = useState<CategorySelection>({
    top: null,
    right: null,
    bottom: null,
    left: null
  })
  const [playAudio, setPlayAudio] = useState<string | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [preloadedAudios, setPreloadedAudios] = useState<{ [key: string]: HTMLAudioElement }>({})
  const [selectionHistory, setSelectionHistory] = useState<string[]>([])
  const [selectedAuxiliaryCard, setSelectedAuxiliaryCard] = useState<string | null>(null)
  const [currentAudioTime, setCurrentAudioTime] = useState(0)

  useEffect(() => {
    const audioUrls = cards.flatMap(card => [
      card.audioSrc,
      ...Object.values(card.combinationAudios),
      ...Object.values(card.tripleAudios)
    ])

    const auxiliaryAudioUrls = auxiliaryCards.flatMap(deck => 
      deck.cards.map(card => card.audioSrc)
    )

    const uniqueAudioUrls = Array.from(new Set([...audioUrls, ...auxiliaryAudioUrls]))

    const newPreloadedAudios: { [key: string]: HTMLAudioElement } = {}
    uniqueAudioUrls.forEach(url => {
      if (url !== '/placeholder.mp3') {
        const audio = new Audio(url)
        audio.preload = 'auto'
        newPreloadedAudios[url] = audio
      }
    })

    setPreloadedAudios(newPreloadedAudios)

    return () => {
      Object.values(newPreloadedAudios).forEach(audio => {
        audio.pause()
        audio.src = ''
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      if (playAudio) {
        const audio = preloadedAudios[playAudio]
        if (audio) {
          audio.pause()
          audio.currentTime = 0
        }
      }
    }
  }, [playAudio, preloadedAudios])

  const handleCardSelect = useCallback((selectedCard: Card) => {
    setCurrentAudioTime(0)
    setSelections(prev => {
      const newSelections = { ...prev }
      
      if (newSelections[selectedCard.category] === selectedCard.id) {
        setCurrentAudioTime(0)
        setIsAudioPlaying(true)
        return newSelections
      }
      setSelectedAuxiliaryCard(null)
      // Get the mode limit
      const modeLimit = mode === 'green' ? 3 : mode === 'blue' ? 2 : 1
      
      // Get current selected cards (excluding the category we're about to update)
      const currentSelectedCards = Object.entries(newSelections)
        .filter(([category, id]) => id !== null && category !== selectedCard.category)
        .map(([_, id]) => id) as string[]
      // If we're at or over the limit, remove the oldest selection(s)
      while (currentSelectedCards.length >= modeLimit) {
        const oldestId = selectionHistory.find(id => currentSelectedCards.includes(id))
        if (oldestId) {
          const oldestCard = cards.find(card => card.id === oldestId)
          if (oldestCard) {
            newSelections[oldestCard.category] = null
            currentSelectedCards.splice(currentSelectedCards.indexOf(oldestId), 1)
          }
        }
      }

      // Add the new selection
      newSelections[selectedCard.category] = selectedCard.id
      const newHistory = [...selectionHistory.filter(id => 
        Object.values(newSelections).includes(id) && id !== selectedCard.id
      ), selectedCard.id]
      setSelectionHistory(newHistory)

      // Determine which audio to play
      const selectedCards = Object.values(newSelections).filter(Boolean) as string[]
      
      // Try to play triple combination first (for green mode)
      if (selectedCards.length === 3) {
        const rightCard = cards.find(card => 
          card.category === 'right' && selectedCards.includes(card.id)
        )
        if (rightCard) {
          const otherCards = selectedCards
            .filter(id => id !== rightCard.id)
            .sort()
            .join('')
          const tripleAudio = rightCard.tripleAudios[otherCards]
          if (tripleAudio) {
            setPlayAudio(tripleAudio)
            setIsAudioPlaying(true)
            return newSelections
          }
        }
      }

      // Try to play double combination (for blue mode)
      if (selectedCards.length === 2) {
        if (mode === 'green') {
          setPlayAudio(selectedCard.singleCardAudio)
          setIsAudioPlaying(true)
          return newSelections
        }
        const [card1Id, card2Id] = selectedCards
        const card1 = cards.find(card => card.id === card1Id)
        const card2 = cards.find(card => card.id === card2Id)
        if (card1 && card2) {
          const combinationAudio = card1.combinationAudios[card2.id] || 
                                 card2.combinationAudios[card1.id]
          if (combinationAudio) {
            setPlayAudio(combinationAudio)
            setIsAudioPlaying(true)
            return newSelections
          }
        }
      }
      if (mode !== 'red') {
        setPlayAudio(selectedCard.singleCardAudio)
        setIsAudioPlaying(true)
        return newSelections
      }
      // Play single card audio
      setPlayAudio(selectedCard.audioSrc)
      setIsAudioPlaying(true)
      return newSelections
    })
  }, [mode, selectionHistory])

  const handleAuxiliaryCardSelect = useCallback((cardId: string) => {
    setCurrentAudioTime(0)
    setSelectedAuxiliaryCard(cardId)
    setSelections({
      top: null,
      right: null,
      bottom: null,
      left: null
    })
    setSelectionHistory([])
    const selectedCard = auxiliaryCards.flatMap(deck => deck.cards).find(card => card.id === cardId)
    
    if (selectedCard) {
      // Check if audio is already playing and avoid triggering play again if it's the same audio
      if (playAudio !== selectedCard.audioSrc) {
        setPlayAudio(selectedCard.audioSrc)
        setIsAudioPlaying(true)
      }
    }
  }, [playAudio])

  const isCardSelected = useCallback((card: Card) => {
    return selections[card.category] === card.id
  }, [selections])

 

  const handleModeChange = useCallback(() => {
    setMode(prevMode => {
      let newMode: Mode
      if (prevMode === 'red') newMode = 'blue'
      else if (prevMode === 'blue') newMode = 'green'
      else newMode = 'red'

      // Clean up current audio
      if (playAudio && preloadedAudios[playAudio]) {
        preloadedAudios[playAudio].pause()
        preloadedAudios[playAudio].currentTime = 0
      }

      setSelections({
        top: null,
        right: null,
        bottom: null,
        left: null
      })
      setSelectionHistory([])
      setSelectedAuxiliaryCard(null)
      
      // Play the new mode audio
      setPlayAudio(modeAudios[newMode])
      setIsAudioPlaying(true)

      return newMode
    })
  }, [])

  const handlePauseResume = useCallback(() => {
    setIsAudioPlaying(prev => {
      if (prev && playAudio && preloadedAudios[playAudio]) {
        setCurrentAudioTime(preloadedAudios[playAudio].currentTime)
      }
      return !prev
    })
  }, [playAudio, preloadedAudios])

  const borderColor = useMemo(() => {
    switch (mode) {
      case 'green': return 'border-green-500'
      case 'blue': return 'border-blue-500'
      case 'red': return 'border-red-500'
    }
  }, [mode])


  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center px-4">
        

        {/* Center Image */}
        <div className="flex-grow flex items-center justify-center mb-8">
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            isAudioPlaying && "animate-pulse",
            
          )}>
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%BA%E5%99%A8%E5%9B%BE%E7%89%87-eGo1UE8JBGCWlmLjSN2PkzKVfsBwpt.png"
              alt="Interactive Machine"
              width={200}
              height={200}
              className={cn("w-1/2 h-1/2 translate-x-1/2 object-contain border-8 rounded-2xl p-2",borderColor)}
              priority
            />
          </div>
        </div>

        {/* Cards Container */}
        <div className=" w-full h-full  flex flex-col justify-between items-stretch p-8">
          {/* Auxiliary Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-5 overflow-x-auto">
          {auxiliaryCards.map(deck => (
            <AuxiliaryCard
              key={deck.id}
              deck={deck}
              onCardSelect={handleAuxiliaryCardSelect}
              selectedCard={selectedAuxiliaryCard}
            />
          ))}
        </div>
          {/* Middle Row */}
          <div className="flex justify-between ">
            
            {/* Left Cards */}
            <div className="flex flex-col gap-2">
              {cards.filter(card => card.category === 'left').map(card => (
                <InteractiveCard
                  key={card.id}
                  card={card}
                  isSelected={isCardSelected(card)}
                  onSelect={handleCardSelect}
                />
              ))}
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-2">
              {cards.filter(card => card.category === 'right').map(card => (
                <InteractiveCard
                  key={card.id}
                  card={card}
                  isSelected={isCardSelected(card)}
                  onSelect={handleCardSelect}
                />
              ))}
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="flex justify-center gap-2 mt-6">
            {cards.filter(card => card.category === 'bottom').map(card => (
              <InteractiveCard
                key={card.id}
                card={card}
                isSelected={isCardSelected(card)}
                onSelect={handleCardSelect}
              />
            ))}
          </div>
          {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleModeChange} variant="outline">
            切换模式
          </Button>
          {/* <Button onClick={handleUndo} variant="outline" disabled={selectionHistory.length === 0}>
            <Undo2 className="mr-2 h-4 w-4" /> 撤回
          </Button> */}
          <Button onClick={handlePauseResume} variant="outline" disabled={!playAudio}>
            {isAudioPlaying ? '暂停' : currentAudioTime ? '继续' : "重播"}
          </Button>
        </div>
        </div>
        

        {/* Audio Player */}
        {playAudio && (
          <AudioPlayer
            src={playAudio}
            play={isAudioPlaying}
            initialTime={currentAudioTime}
            onEnded={() => {
              setCurrentAudioTime(0)
              setIsAudioPlaying(false)
            }}
            preloadedAudio={preloadedAudios[playAudio]}
          />
        )}
    </main>
  )
}

