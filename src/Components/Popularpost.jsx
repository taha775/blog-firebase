import React from 'react';
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";
import { CgProfile } from 'react-icons/cg';
import { Share1Icon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';

const Popularpost = () => {
  const { theme } = useSelector(state => state.theme); 
  return (
    <div className={`${theme ==="dark"?"text-gray-300 bg-gray-800":"text-black bg-white"}ml-2 w-auto h-auto space-x-16 `}>
      <h1 className="relative text-4xl font-myfont text-black text-center font-bold before:absolute before:top-1/2 before:left-10 before:w-[38%] before:h-[1px] before:bg-gray-600 before:content-[''] before:-translate-y-1/2 after:absolute after:top-1/2 after:right-10 after:w-[38%] after:h-[1px] after:bg-gray-600 after:content-[''] after:-translate-y-1/2">
       <span className={`${theme ==="dark"?"text-gray-300":"text-black"}`}>Popular Posts</span> 
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-6'>
        {/* Post 1 */}
        <div className='relative' style={{ minWidth: "20rem", minHeight: "19rem" }}>
          <img className='absolute w-full h-full object-cover' src={img7} alt="Popular Post" />
          <div className='absolute bottom-0 flex flex-col justify-start gap-2 p-4 w-full text-white bg-black bg-opacity-50 h-1/2'>
            <p>Related: <span className='text-myorange'>News</span></p>
            <div className='flex items-center gap-2'>
              <CgProfile className='text-myorange' />
              <p className='text-myorange'>Jhon</p>
            </div>
            <p>Date: 25/11/2002</p>
          </div>
        </div>
        <div className='flex-1 md:col-span-2'>
        <h1 className="text-2xl  font-myfont  font-bold mb-2">
  If you're stranded on an island, a '<span className="text-myorange">HELP</span>' <span className="text-myorange">sign</span> can actually <span className="text-myorange">save</span> you — but there's an even <span className="text-myorange">better</span> way to get rescued
</h1>


          <p className="mb-4">
            Two of three men stranded on the uninhabited island of Pikelot Atoll in Micronesia wave life jackets as
            a U.S. Navy P-8A Poseidon maritime patrol and reconnaissance aircraft discovers them.
          </p>
          <p className="mb-4">
            Three men stranded on a Pacific island were rescued after creating a "HELP" sign with palm leave...
          </p>
          <button className='bg-myorange px-4 py-2 hover:bg-black hover:text-myorange rounded'>Read More</button>
          <div className='flex mt-4 space-x-4'>
            <button className='hover:bg-myorange hover:text-black text-myorange px-4 py-2 rounded flex gap-2 items-center'> <Share1Icon/> Share</button>
            <button className='hover:bg-myorange text-myorange hover:text-black px-4 py-2 rounded'>Save</button>
          </div>
        </div>
        
        {/* Post 2 */}
        <div className='relative' style={{ minWidth: "20rem", minHeight: "19rem" }}>
          <img className='absolute w-full h-full object-cover' src={img8} alt="Popular Post" />
          <div className='absolute  bottom-0 flex flex-col justify-end gap-2 p-4 w-full text-white bg-black  bg-opacity-50 h-1/2'>
            <p>Related: <span className='text-myorange'>News</span></p>
            <div className='flex items-center gap-2'>
              <CgProfile className='text-myorange' />
              <p className='text-myorange'>Jhon</p>
            </div>
            <p>Date: 25/11/2002</p>
          </div>
        </div>
        <div className='flex-1 md:col-span-2'>
        <h1 className="text-2xl  font-myfont font-bold mb-2">
  <span>NBA</span> <span>play-in:</span> <span className="text-myorange">Kings</span> <span className="text-myorange">get revenge</span> <span>and</span> <span className="text-myorange">end Warriors' season,</span> <span>will play Pelicans for No. 8 seed</span>
</h1>


          <p className="mb-4">
            The Sacramento Kings showed what a difference a year can make on Tuesday. The result was the end of the Golden State Warriors' season.
            The Kings defeated the Warriors 118-94 in the 9 vs. 10 game of the NBA play-in tournament, one year after falling to their Northern California rivals in Game 7 of the first round. Their reward will be a Friday game against the New Orleans Pelicans, who lost earlier Tuesday to the Los Angeles Lakers .......
          </p>
          <button className='bg-myorange px-4 py-2 hover:bg-black hover:text-myorange rounded'>Read More</button>
          <div className='flex mt-4 space-x-4'>
            <button className='hover:bg-myorange hover:text-black text-myorange px-4 py-2 rounded flex gap-2 items-center'> <Share1Icon/> Share</button>
            <button className='hover:bg-myorange text-myorange hover:text-black px-4 py-2 rounded'>Save</button>
          </div>
        </div>
        
        {/* Post 3 */}
        <div className='relative' style={{ minWidth: "20rem", minHeight: "19rem" }}>
          <img className='absolute w-full h-full object-cover' src={img9} alt="Popular Post" />
          <div className=' bottom-0 absolute flex flex-col justify-end gap-2 p-4 w-full text-white bg-black  bg-opacity-50 h-1/2'>
            <p>Related: <span className='text-myorange'>News</span></p>
            <div className='flex items-center gap-2'>
              <CgProfile className='text-myorange' />
              <p className='text-myorange'>Jhon</p>
            </div>
            <p>Date: 25/11/2002</p>
          </div>
        </div>
        <div className='flex-1 md:col-span-2'>
          <h1 className="text-2xl font-myfont  font-bold mb-2"> <span className='text-myorange'>Damon Albarn </span> reveals he didn’t <span className='text-myorange'>want to perform</span>  during second night of <span className='text-myorange'>Blur’s Wembley shows</span> </h1>
          <p className="mb-4">
            Blur frontman Damon Albarn has revealed that he didn’t want to perform during the band’s second Wembley show last year.
            READ MORE: Blur live in London: stadium-sized eruptions of pure, utter joy
            In November 2022, Blur announced a reunion gig at Wembley Stadium for July 8, 2023. Due to overwhelming demand, the reunion gig turned into a two-parter, with a second show announced shortly after.
          </p>
          <button className='bg-myorange px-4 py-2 hover:bg-black hover:text-myorange rounded'>Read More</button>
          <div className='flex mt-4 space-x-4'>
            <button className='hover:bg-myorange hover:text-black text-myorange px-4 py-2 rounded flex gap-2 items-center'> <Share1Icon/> Share</button>
            <button className='hover:bg-myorange text-myorange hover:text-black px-4 py-2 rounded'>Save</button>
          </div>
        </div>
        
        {/* Post 4 */}
        <div className='relative' style={{ minWidth: "20rem", minHeight: "19rem" }}>
          <img className='absolute w-full h-full object-cover' src={img10} alt="Popular Post" />
          <div className=' bottom-0 absolute flex flex-col justify-end gap-2 p-4 w-full text-white bg-black  bg-opacity-50 h-1/2'>
            <p>Related: <span className='text-myorange'>News</span></p>
            <div className='flex items-center gap-2'>
              <CgProfile className='text-myorange' />
              <p className='text-myorange'>Jhon</p>
            </div>
            <p>Date: 25/11/2002</p>
          </div>
        </div>
        <div className='flex-1 md:col-span-2'>
          <h1 className="text-2xl font-bold  font-myfont mb-2">I quit  <span className='text-myorange'>McKinsey</span>  after <span className='text-myorange'> 1.5 years</span>. I was making over <span className='text-myorange'>$200k</span> but my <span className='text-myorange'>mental health</span>  was  <span className='text-myorange'>shattered</span>.</h1>
          <p className="mb-4">
            Two of three men stranded on the uninhabited island of Pikelot Atoll in Micronesia wave life jackets as
            a U.S. Navy P-8A Poseidon maritime patrol and reconnaissance aircraft discovers them.
          </p>
          <p className="mb-4">
            Three men stranded on a Pacific island were rescued after creating a "HELP" sign with palm leave...
          </p>
          <button className='bg-myorange px-4 py-2 hover:bg-black hover:text-myorange rounded'>Read More</button>
          <div className='flex mt-4 space-x-4'>
            <button className='hover:bg-myorange hover:text-black text-myorange px-4 py-2 rounded flex gap-2 items-center'> <Share1Icon/> Share</button>
            <button className='hover:bg-myorange text-myorange hover:text-black px-4 py-2 rounded'>Save</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Popularpost;
