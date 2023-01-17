import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { Tab } from '@headlessui/react';
import type { LightGallery } from 'lightgallery/lightgallery';
import LightGalleryComponent from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import ocean1 from '../public/ocean-1.jpg'
import ocean2 from '../public/ocean-2.jpg'
import ocean3 from '../public/ocean-3.jpg'
import ocean4 from '../public/ocean-4.jpg'
import ocean5 from '../public/ocean-5.jpg'
import photographyBg from '../public/photography-bg.jpg'
import { useRef } from 'react';

const tabs = [
  {key: 'all', display: 'ALL'},
  {key: 'oceans', display: 'OCEANS'},
  {key: 'forests', display: 'FORESTS'},
]

const images = [ocean1, ocean2, ocean3, ocean4, ocean5]

export default function Home() {
  const lightboxRef = useRef<LightGallery | null>(null)

  return (
    <div className='h-full overflow-auto'>
      <Head>
        <title>Photographer</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Image placeholder='blur' src={photographyBg} alt="" className='fixed left-0 top-0 z-0 from-stone-900 bg-gradient-to-t' />
      <div className="fixed left-0 top-0 w-full h-full z-10"></div>
      <header className="flex bg-stone-900  w-full z-30 top-0 fixed justify-between items-center h-[90px] px-10">
        <span className="font-black text-3xl">PHOTO!</span>
        <Link href={'/'} className="rounded-full hover:bg-opacity-90 hover:font-semibold transition-all duration-100 bg-white font-medium text-stone-700 px-3 py-2 text-sm">Get in touch</Link>
      </header>
      <main className='pt-[110px] relative z-20'>
     <div className="flex items-center flex-col h-full">
     <Tab.Group>
      <Tab.List className='flex text-sm font-light items-center gap-16'>
        {tabs.map((tab) => (
          <Tab className='px-4 py-0.5' key={tab.key}>{({selected}) => (<span className={selected ? 'text-stone-300' : 'text-stone-400'}>{tab.display}</span>)}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels className='h-full bg-stone-900 bg-opacity-40 max-w-[900px] w-full p-2 sm:p-4 my-6'>
        <Tab.Panel>
        <Masonry
          breakpointCols={2}
          className="flex gap-4"
          columnClassName="my-masonry-grid_column">
            {images.map((image, idx) => (
              <Image onClick={() => {
                lightboxRef.current?.openGallery(idx)
              }} key={image.src} placeholder='blur' src={image} alt="" className='my-4' />
            ))}
        </Masonry>
        <LightGalleryComponent onInit={(ref) => {
          if(ref) {
            lightboxRef.current = ref.instance
          }
        }} dynamicEl={[
          { src: '/ocean-1.jpg', thumb: '/ocean-1.jpg' },
          { src: '/ocean-2.jpg', thumb: '/ocean-2.jpg' },
          { src: '/ocean-3.jpg', thumb: '/ocean-3.jpg' },
          { src: '/ocean-4.jpg', thumb: '/ocean-4.jpg' },
          { src: '/ocean-5.jpg', thumb: '/ocean-5.jpg' },
        ]} dynamic speed={500} plugins={[lgThumbnail, lgZoom]} />
        </Tab.Panel>
        <Tab.Panel>Oceans</Tab.Panel>
        <Tab.Panel>Forests</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
     </div>
      </main>
      <footer className='h-[90px] flex justify-center items-center z-20 relative'>
        <p className='uppercase text-sm text-stone-500 font-black'>Photography Portfolio &copy; 2023</p>
      </footer>
    </div>
  );
}
