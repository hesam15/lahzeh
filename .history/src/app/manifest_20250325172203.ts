
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
        src: "asset/72-72.png",
        type: "image/png", 
        sizes: "72x72"
      },
      {
        src: "asset/96-96.png",
        type: "image/png", sizes: "96x96"
      },
      {
        src: "asset/128-128.png",
        type: "image/png",sizes: "128x128"
      },
      {
       src: "asset/144-144.png",
        type: "image/png", sizes: "144x144"
      },
      {
        src: "asset/152-152.png",
        type: "image/png", sizes: "152x152"
      },
      {
        src: "asset/192-192.png",
        "type": "image/png", sizes: "192x192"
      },
      {
        src: "asset/384-384.png",
        "type": "image/png", sizes: "384x384"
      },
      {
        src: "asset/512-512.png",
        "type": "image/png", sizes: "512x512"
      }
    
    ],
  }
}