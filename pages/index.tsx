import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import * as  nodeFetch from 'node-fetch'
import photographyBg from '../public/photography-bg.jpg'
import { GetStaticProps } from 'next';
import { HomeProps } from '@/types';
import { createApi } from 'unsplash-js';
import { getImages } from '@/utils/image-util';
import Gallery from '@/components/Gallery';

type CreateApi = ReturnType<typeof createApi>

const tabs = [
  {key: 'all', display: 'ALL'},
  {key: 'oceans', display: 'OCEANS'},
  {key: 'forests', display: 'FORESTS'},
]

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNPLASH_ACCESS_KEY!,
    fetch: nodeFetch.default as unknown as typeof fetch
  })
 
  const [oceans, forests] = await Promise.all([
    getImages(unsplash, 'oceans'),
    getImages(unsplash, 'forests'),
  ])
  
  return {
    props: {
      oceans,
      forests,
    },
  }
}

export default function Home({oceans, forests}: HomeProps) {
  
  return (
    <div className='h-full overflow-auto'>
      <Head>
        <title>Photographer</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Image placeholder='blur' src={photographyBg} alt="" className='fixed opacity-90 left-0 top-0 z-0 from-stone-900 bg-gradient-to-t' />
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
          <Gallery photos={[...oceans, ...forests]} />
        </Tab.Panel>
        <Tab.Panel>
        <Gallery photos={oceans} />
        </Tab.Panel>
        <Tab.Panel>
          <Gallery photos={forests} />
        </Tab.Panel>
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



