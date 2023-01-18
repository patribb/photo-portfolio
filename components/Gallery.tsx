import { Photo } from "@/types"
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useRef } from 'react';
import type { LightGallery } from 'lightgallery/lightgallery';
import LightGalleryComponent from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

interface GalleryProps {
    photos: Photo[]
  }
  
  const Gallery = ({photos}: GalleryProps) => {
    const lightboxRef = useRef<LightGallery | null>(null)
    return (
     <>
      <Masonry
            breakpointCols={2}
            className="flex gap-4"
            columnClassName="my-masonry-grid_column">
              {photos.map((photo, idx) => (
               <div key={photo.src} className='relative'>
                 <Image
                blurDataURL={photo.blurDataURL}
                width={photo.width}
                height={photo.height} 
                src={photo.src} alt={photo.alt} 
                className='my-4 relative' />
                <div 
                 onClick={() => {
                  lightboxRef.current?.openGallery(idx)
                }}
                className='absolute w-full h-full bg-transparent hover:bg-stone-900 hover:bg-opacity-30 hover:cursor-pointer inset-0'></div>
               </div>
              ))}
          </Masonry>
          <LightGalleryComponent onInit={(ref) => {
            if(ref) {
              lightboxRef.current = ref.instance
            }
          }} 
          dynamicEl={photos.map(photo => ({
            key: photo.src,
            src: photo.src,
            thumb: photo.src
          }))} 
          dynamic speed={500} plugins={[lgThumbnail, lgZoom]} /> 
     </>
    )
  }

  export default Gallery