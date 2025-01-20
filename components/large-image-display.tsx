import Image from 'next/image'

interface LargeImageDisplayProps {
  images: {
    src: string
    alt: string
  }[]
}

export function LargeImageDisplay({ images }: LargeImageDisplayProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
      {images.map((image, index) => (
        <div key={index} className="bg-white p-2 rounded-lg shadow-lg">
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={300}
            className="object-cover rounded"
          />
        </div>
      ))}
    </div>
  )
}

