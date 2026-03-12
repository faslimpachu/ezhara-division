'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const galleryItems = [
  {
    id: 1,
    title: 'The Ezhara Coastline',
    subtitle: 'Beaches & Sunsets',
    description: 'Pristine sandy shores with the Arabian Sea stretching endlessly, offering breathtaking sunsets',
    gradient: 'from-orange-400 to-red-500',
    gridClass: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    title: 'Local Culture & Festivals',
    subtitle: 'Sargotsav & Heritage',
    description: 'Experience the vibrant local culture and colorful festivals celebrated year-round',
    gradient: 'from-purple-400 to-pink-500',
    gridClass: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    title: 'Educational Excellence',
    subtitle: 'Schools & Institutions',
    description: 'Top-tier educational facilities including Al Madrasathul Islahiya and Government Schools',
    gradient: 'from-blue-400 to-cyan-500',
    gridClass: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    title: 'Hidden Tourist Spots',
    subtitle: 'Explore & Discover',
    description: 'Secluded beaches, scenic viewpoints, and local gems waiting to be discovered',
    gradient: 'from-green-400 to-emerald-500',
    gridClass: 'col-span-2 row-span-1',
  },
]

export default function AboutBentoGallery() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Discover Ezhara's Hidden Gems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the visual beauty and cultural richness of our vibrant ward
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[280px] md:auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${item.gridClass} group relative overflow-hidden rounded-2xl`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-90 transition-opacity`}
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-4 md:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="z-10"
                >
                  <Badge className="mb-3 bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {item.subtitle}
                  </Badge>
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
