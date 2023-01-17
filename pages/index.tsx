import Head from 'next/head';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { Tab } from '@headlessui/react';

const tabs = [
  {key: 'all', display: 'ALL'},
  {key: 'oceans', display: 'OCEANS'},
  {key: 'forests', display: 'FORESTS'},
]

export default function Home() {
  return (
    <div className='h-full bg-[url("/photography-bg.jpg")] bg-top bg-cover overflow-auto'>
      <Head>
        <title>Photographer</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className="flex bg-stone-900  w-full z-10 top-0 fixed justify-between items-center h-[90px] px-6">
        <div className="font-black text-3xl">PHOTO!</div>
        <Link href={'/'} className="rounded-full hover:bg-opacity-90 hover:font-semibold transition-all duration-100 bg-white font-medium text-stone-700 px-3 py-2 text-sm">Get in touch</Link>
      </header>
      <main className='pt-[110px]'>
     <div className="flex items-center flex-col h-full">
     <Tab.Group>
      <Tab.List className='flex text-sm font-light items-center gap-16'>
        {tabs.map((tab) => (
          <Tab className='px-4 py-0.5' key={tab.key}>{({selected}) => (<span className={selected ? 'text-stone-300' : 'text-stone-400'}>{tab.display}</span>)}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels className='h-full bg-stone-900 bg-opacity-20 max-w-[900px] w-full p-2 sm:p-4 my-6'>
        <Tab.Panel>
        <Masonry
          breakpointCols={2}
          className="flex gap-2"
          columnClassName="my-masonry-grid_column">
        <img src="/ocean-5.jpg" alt="" className='my-2' />
        <img src="/ocean-2.jpg" alt="" className='my-2' />
        <img src="/ocean-3.jpg" alt="" className='my-2' />
        <img src="/ocean-4.jpg" alt="" className='my-2' />
        <img src="/ocean-1.jpg" alt="" className='my-2' />
        </Masonry>
        </Tab.Panel>
        <Tab.Panel>Oceans</Tab.Panel>
        <Tab.Panel>Forests</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
     </div>
      </main>
      <footer className='h-[60px] flex justify-center items-center'>
        <p>Photography Portfolio &copy; 2023</p>
      </footer>
    </div>
  );
}
