import H4 from 'util/H4';
import H5 from 'util/H5';
import Image from 'next/image';
import { Pic } from 'util/Pic';

const helpOptions = [
  {
    title: 'Call us',
    value: 'call-back',
    image: '/dezy/unified-booking/callus.svg',
    href: 'tel:+917618792440',
  },
  {
    title: 'Chat with Us',
    value: 'chat',
    image: '/dezy/unified-booking/chatwithus.svg',
    href: 'https://api.whatsapp.com/send?phone=+917618792440&text=Hello%20Dezy',
  },
];

function NeedHelp({ onClick }) {
  return (
    <div className="text-center bg-dezy-blue px-2 py-6 w-full">
      <div className="text-center mx-auto mb-2">
        <H4 className="text-white leading-tight ">Need more help?</H4>
        {/* <Body2 className="text-dezy-blue leading-tight">Add one line of copy here</Body2> */}
      </div>
      <div className="py-4 px-4 md:px-8">
        {helpOptions.map((item) => (
          <a
            href={item.href}
            // onClick={() => onClick(item.value)}
          >
            <div className="max-w-lg bg-white rounded-2xl px-2 mx-auto cursor-pointer hover:border-dezy-lightBlue shadow mb-3">
              <div className="bg-white py-2 rounded-2xl flex items-center mx-2 my-2">
                <div className=" relative w-14 h-14 bg-violet-50 rounded-md">
                  <Image src={item.image} layout="fill" objectFit="scale-down" />
                </div>

                <H5 className="text-dezy-blue flex-1 text-left font-semibold leading-tight ml-4">
                  {item.title}
                </H5>
                <div className="relative w-6 h-6">
                  <Pic
                    className="rotate-180 w-full h-full"
                    src="/dezy/signature/back_icon.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default NeedHelp;
