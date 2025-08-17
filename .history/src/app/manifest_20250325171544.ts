
import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lahze",
    short_name: "Lahze",
    description: "لورم ایپسوم ...........",
    start_url: '/',
    display: 'standalone',
    background_color: "#303841",
    theme_color: "#002868",
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'images/png',
      },
    
    ],
  }
}