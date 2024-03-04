import { useEffect, useState } from 'react';

export default function TreatmentsPlanned({ treatments }) {
  const [selectedTreatment, setSelectedTreatment] = useState('');

  useEffect(() => {
    setSelectedTreatment(
      Object.keys(treatments).length > 0 ? Object.keys(treatments)[0] : '',
    );
  }, [treatments]);

  return (
    <div className="bg-[#F3E9E6] -mt-12 pb-10 ">
      <svg
        className="bg-[#F3E9E6]"
        fill="#361272"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="50"
        viewBox="0.1 0.3 200 19"
        preserveAspectRatio="none"
      >
        <g transform="translate(-0.21755166,-100.15454)">
          <path d="M 0.2688579,100.29477 H 200.98548 c 0,0 -99.37375,39.84098 -200.7166221,0 z" />
        </g>
      </svg>

      <div className="px-4 bg-[#F3E9E6]">
        <div className="mx-auto w-full md:max-w-lg bg-white px-8 py-6 rounded-4xl mt-10">
          <p className="text-dezy-blue mb-6 text-[16px] md:text-[18px]">
            Treatments Planned
          </p>
          {Object.keys(treatments).length > 1 && (
            <div>
              <div className="flex flex-wrap gap-3 mb-8">
                {Object.entries(treatments).map(([key, item], index) => (
                  <div
                    className={`${
                      key === selectedTreatment && 'bg-dezy-blue text-white'
                    } rounded-full text-dezy-blue px-4 py-2 cursor-pointer border border-dezy-blue text-[12px] md:text-[16px]`}
                    onClick={() => {
                      setSelectedTreatment(key);
                    }}
                  >
                    Treatment
                    {' '}
                    {index + 1}
                  </div>
                ))}
              </div>

              <div className="bg-[#F3E9E6] h-[1px] my-6" />
            </div>
          )}

          <div className="bg-[#F3E7FF] p-4 rounded-xl">
            <p className="text-[12px] md:text-[16px] text-dezy-blue">
              Includes:
            </p>
            <ul className="flex flex-col gap-1">
              {selectedTreatmentSuggestion.map((item) => (
                <li className="text-[12px] md:text-[16px]">hello</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-[#FBF8F7] p-4 mt-6">
            <div className="flex gap-4 justify-between items-center">
              <p className="text-[12px] md:text-[16px]">
                Total Treatment Cost:
              </p>
              <p className="text-[12px] md:text-[16px]">INR 100</p>
            </div>
            <div className="flex gap-4 justify-between items-center mt-3">
              <p className="text-[12px] md:text-[16px]">Amount Paid:</p>
              <p className="text-[12px] md:text-[16px]">-INR 2000</p>
            </div>
            <div className="flex gap-4 justify-between items-center mt-3">
              <p className="text-green-700 text-[12px] md:text-[16px]">
                Discount:
              </p>
              <p className="text-green-700 text-[12px] md:text-[16px]">
                -INR 3000
              </p>
            </div>
            <div className="bg-[#F3E9E6] h-[1px] my-4" />
            <div className="flex gap-4 justify-between items-center mt-3">
              <p className="text-[12px] md:text-[16px]">
                Total Payable Amount:
              </p>
              <p className="text-[12px] md:text-[16px]">
                INR
                {/* {Math.max(
                  0,
                  selectedTotalCost +
                    selectedTotalPaymentRefunded -
                    (selectedTotalDiscount + selectedTotalPaymentRecieved),
                )} */}
                1234
              </p>
            </div>
          </div>

          {/* {isPaymentLinkCreated && (
            <div>
              <div
                className="flex justify-center mt-4"
                onClick={() => {
                  router.push(`/treatment?uid=${uid}&tid=${selectedTreatment}`);
                }}
              >
                <CtaButton>
                  Pay INR
                  {payableAmount}
                </CtaButton>
              </div>
            </div>
          )} */}

          <div className="rounded-xl p-4 flex items-center gap-4 bg-[#F3E9E6] mt-6">
            <svg
              fill="none"
              className="text-dezy-blue h-7 w-7 flex-none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-dezy-blue text-[10px] md:text-[12px]">
              Note: Additional treatment charges may be required based on the
              case complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
