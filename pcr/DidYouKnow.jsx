import H5 from 'util/H5';
import { Pic } from 'util/Pic';

const stats = [
  {
    text: '200+ specialists dentists',
    icon: '/post-consultation-report/specialist.svg',
  },
  {
    text: 'Dental precision powered by new-age technology',
    icon: '/post-consultation-report/tech.svg',
  },
  {
    text: '4.7 Stars average patient rating',
    icon: '/post-consultation-report/stars.svg',
  },
  {
    text: '1,00,000+ Happy smiles delivered',
    icon: '/post-consultation-report/smile.svg',
  },
];

export default function DidYouKnow() {
  return (
    <div className="bg-[#F3E9E6] py-6 px-4">
      <div className="mx-auto w-full md:max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((item) => (
            <div className="mx-auto w-full bg-white flex flex-col justify-center px-4 py-3 md:px-8 md:py-6  col-span-1 rounded-4xl">
              <img
                className="mb-3 h-12 w-12 md:h-16 md:w-16 mx-auto"
                src={item.icon}
                alt=""
              />
              <p className="font-normal text-center text-[#757575] text-[12px] md:text-[16px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#E0CDB3] mt-10 p-6">
          <H5 className="text-center mb-6">Did you know?</H5>
          <div className="relative h-60 w-full">
            <Pic src="/post-consultation-report/love.png" alt="" />
          </div>
          <H5 className="text-dezy-blue text-center mt-6">
            164 million work hours lost each year due to dental health issues
          </H5>
        </div>
      </div>
    </div>
  );
}
