'use client'

export type FeatureRowProps = {
  eyebrow?: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
}

export default function FeatureRow({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = 'Feature screenshot',
  reverse = false,
}: FeatureRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
      {/* Text Block */}
      <div className={reverse ? 'md:order-2' : 'md:order-1'}>
        {eyebrow && (
          <p className="text-sm font-semibold text-purple-300 uppercase tracking-widest">
            {eyebrow}
          </p>
        )}
        <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-white leading-tight">
          {title}
        </h3>
        <p className="mt-4 text-white/70 leading-relaxed text-lg">
          {description}
        </p>
      </div>

      {/* Media Block */}
      <div className={reverse ? 'md:order-1' : 'md:order-2'}>
        <div className="relative w-full rounded-2xl bg-[#0f1012] ring-1 ring-white/10 p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,.45)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(0,0,0,.55)]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full aspect-[16/9] object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
