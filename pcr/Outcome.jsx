import Body1 from 'util/Body1';
import Body2 from 'util/Body2';
import H5 from 'util/H5';
// import ResponsiveDrawer from 'dezy/Components/beta/LightsOutLoginFlow/ResponsiveDrawer';
import { useEffect, useState } from 'react';

function containsTypeAndSave(data, type) {
  const foundItems = data.filter((item) => item.type === type);
  return foundItems.length > 0 ? foundItems : [];
}

export default function Outcome({
  appointmentDetails,
  treatmentSuggestion,
}) {
  const patientName = 'Patient';
  const [prePostSingedUrl, setPrePostSignedUrl] = useState([]);
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);
  const [alignerplanType, setAlignerPlanType] = useState('');
  const [doctorType, setDoctorType] = useState('');
  const [whyDezySection, setWhyDezySection] = useState([
    'Treatment Inclusions',
    'Why Dezy Aligners',
  ]);
  const [alignerInfo, setAlignerInfo] = useState([]);
  const [implantInfo, setImplantInfo] = useState([]);
  const [primaryConcern, setPrimaryConcern] = useState('');
  const [orthodontistRemarks, setOrthodontistRemarks] = useState({});
  const [show3dScanResult, setShow3dScanResult] = useState(false);

  useEffect(() => {
    const concern = appointmentDetails?.pre_plan_concern
      || appointmentDetails?.chief_complaint
      || appointmentDetails?.sed_questionnaire?.chief_complaint
      || '';
    setPrimaryConcern(concern);

    if (
      appointmentDetails
      && Array.isArray(appointmentDetails.ortho_comments)
      && appointmentDetails.ortho_comments.length > 0
    ) {
      const remarks = appointmentDetails.ortho_comments.map((item) => ({
        subheading: item?.subject,
        text: item?.comment,
      }))[0];
      setOrthodontistRemarks(remarks);
    }
  }, [appointmentDetails]);

  useEffect(() => {
    const newAlignerInfo = containsTypeAndSave(treatmentSuggestion, 'aligner');
    const newImplantInfo = containsTypeAndSave(treatmentSuggestion, 'implant');

    setAlignerInfo(newAlignerInfo);
    setImplantInfo(newImplantInfo);
  }, [treatmentSuggestion]);

  useEffect(() => {
    // Compute values
    if (alignerInfo) {
      const PlanType = _get(alignerInfo[0], 'plan_type', '-');
      setAlignerPlanType(PlanType);
      setDoctorType('Orthodontist');
    }
  }, [alignerInfo]);

  useEffect(() => {
    if (
      orthodontistRemarks
      && Object.keys(orthodontistRemarks).length > 0
      && (implantInfo.length > 0 ? true : prePostSingedUrl.length > 0)
    ) {
      setShow3dScanResult(true);
    }
  }, [implantInfo.length, orthodontistRemarks, prePostSingedUrl]);

  const [implantCount, setImplantCount] = useState('-');
  const [crownsCount, setCrownsCount] = useState('-');
  const [crownType, setCrownType] = useState('-');
  const [treatmentType, setTreatmentType] = useState('-');

  useEffect(() => {
    // Compute values
    if (implantInfo.length > 0) {
      const computedImplanPlanType = _get(
        implantInfo[0],
        'implant_plan_type',
        '-',
      );
      const computedImplantCount = _get(implantInfo[0], 'implant_count', '-');
      const computedCrownsCount = _get(implantInfo[0], 'crown_count', '-');
      const computedCrownType = _get(implantInfo[0], 'crown_type', '-');
      const computedTreatmentType = computedImplanPlanType === 'individual'
        ? 'Multi Tooth Implants'
        : computedImplanPlanType === 'single_arch'
          ? 'Single Arch Implants'
          : computedImplanPlanType === 'full_mouth'
            ? 'Full Mouth Implants'
            : computedImplanPlanType === 'single_arch_individual'
              ? 'Single Arch and Multi Tooth Implants'
              : '-';

      // Update state
      setImplanPlanType(computedImplanPlanType);
      setImplantCount(computedImplantCount);
      setCrownsCount(computedCrownsCount);
      setCrownType(computedCrownType);
      setTreatmentType(computedTreatmentType);
      setDoctorType('Implantologist');
      setWhyDezySection(['Why Dezy is perfect for you?']);
    }
  }, [implantInfo]);

  return (
    <>
      <div className="relative -mt-12 ">
        <div className="absolute rounded-4xl bg-dezy-lightBlue px-6 text-xl sm:text-2xl text-white py-3 text-center whitespace-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-2 md:mt-4">
          3D Dental Scan Results
        </div>
        <svg
          className="bg-dezy-blue"
          fill="#FBF8F7"
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
      </div>
      {show3dScanResult ? (
        <div className="bg-dezy-blue py-20 px-4">
          {prePostSingedUrl.length > 0 && alignerInfo.length > 0 && (
            <div className="mx-auto w-full md:max-w-lg bg-white px-8 py-6 rounded-4xl">
              <H5 className="text-dezy-blue mb-6">Outcome visualization</H5>
              <div className="flex flex-wrap gap-3 mb-8">
                {prePostSingedUrl.map((item, index) => (
                  <div
                    className={`${
                      index === selectedViewIndex && 'bg-dezy-blue text-white'
                    } rounded-full text-dezy-blue px-4 py-2 cursor-pointer border border-dezy-lightBlue`}
                    onClick={() => {
                      setSelectedViewIndex(index);
                    }}
                  >
                    View
                    {' '}
                    {index + 1}
                  </div>
                ))}
              </div>
              <Body1 className="font-normal mb-6">
                {patientName}
                &apos;s Teeth Front View
                {' '}
                {selectedViewIndex + 1}
              </Body1>

              <div className="rounded-2xl overflow-hidden">
                <img
                  src={prePostSingedUrl[selectedViewIndex]}
                  width="auto"
                  height="236px"
                />
              </div>

              <Body2 className="mt-8 text-[#757575">
                *Disclaimer: This is a computer based virtual treatment setup,
                and may or may not resemble the patient&apos;s actual condition.
                The final treatment may vary from the simulation results.
              </Body2>
            </div>
          )}
          {implantInfo.length > 0 && (
            <div className="mx-auto w-full md:max-w-lg bg-white px-8 py-6 rounded-4xl">
              <H5 className="text-dezy-blue mb-6">Outcome visualization</H5>

              <Body2 className="mt-8 text-[#757575">
                *Disclaimer: This is a computer based virtual treatment setup,
                and may or may not resemble the patient&apos;s actual condition.
                The final treatment may vary from the simulation results.
              </Body2>
            </div>
          )}
          {primaryConcern && (
            <div className="mx-auto w-full md:max-w-lg bg-white px-8 py-6 rounded-4xl mt-8 whitespace-normal">
              <H5 className="text-dezy-blue mb-10">Patient&apos;s Concern</H5>
              <Quote content={primaryConcern} />
            </div>
          )}

          <div className="mx-auto w-full md:max-w-lg bg-white px-8 py-6 rounded-4xl mt-8">
            {orthodontistRemarks
              && Object.keys(orthodontistRemarks).length > 0 && (
                <div>
                  <H5 className="text-dezy-blue mb-10">
                    {doctorType}
                    &apos;s Remarks
                  </H5>
                  <Quote content={orthodontistRemarks.text} />
                  <div className="bg-[#F3E9E6] h-[1px] my-4" />
                </div>
            )}

            {(alignerInfo.length > 0 || implantInfo.length > 0) && (
              <div className="px-4 my-6">
                <p
                  className={`text-dezy-blue mt-4 font-normalold text-[14px] md:text-[16px] ${
                    orthodontistRemarks.length == 0
                    && 'md:text-[20px] text-dezy-blue mb-4 '
                  }`}
                >
                  Treatment Details
                </p>
                {alignerInfo.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="font-normal text-[14px] md:text-[16px]">
                      Type of aligners:
                      {' '}
                      <span className="text-dezy-blue my-2">
                        {_startCase(alignerplanType)}
                      </span>
                    </p>
                  </div>
                )}

                {implantInfo.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="font-normal text-[14px] md:text-[18px] ">
                      Treatment Type:
                      {' '}
                      <span className="text-dezy-blue">{treatmentType}</span>
                    </p>
                    {[
                      'Multi Tooth Implants',
                      'Single Arch Implants',
                      'Single Arch and Multi Tooth Implants',
                    ].includes(treatmentType) && (
                      <div>
                        <p className="font-normal text-[14px] md:text-[18px] ">
                          Number of Implants:
                          {' '}
                          <span className="text-dezy-blue">{implantCount}</span>
                        </p>
                        <p className="font-normal text-[14px] md:text-[18px] ">
                          Number of Crowns:
                          {' '}
                          <span className="text-dezy-blue">{crownsCount}</span>
                        </p>
                        <p className="font-normal text-[14px] md:text-[18px] ">
                          Type of Crowns:
                          {' '}
                          <span className="text-dezy-blue my-2">
                            {crownType}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-[#F3E9E6] h-[1px] mt-5" />
              </div>
            )}
            <div className="flex gap-4 flex-row justify-between items-center mb-6">
              {whyDezySection.map((item, index) => (
                <div
                  className="w-full rounded-xl flex gap-2 justify-between px-6 py-4 bg-[#FBF8F7] border border-[#E0CDB3] items-center cursor-pointer"
                  key={item}
                >
                  <p className="text-dezy-blue text-[12px] md:text-[16px]">
                    {item}
                  </p>
                  <div className="p-2 bg-[#F3E9E6] rounded-lg flex justify-center items-center">
                    <svg
                      fill="none"
                      className="h-4 w-4"
                      stroke="currentColor"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F3E9E6] h-[1px] mb-6" />

            <div className="rounded-xl p-4 flex items-center gap-6 bg-[#F3E9E6] mb-6">
              <svg
                fill="none"
                className="text-dezy-blue h-8 w-8 flex-none"
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
              <p className="text-dezy-blue text-[12px] md:text-[16px]">
                If you have medical conditions, a dentist consultation is
                required before treatment
              </p>
            </div>

            <p className="text-[#3A3A3A] text-[10px] md:text-[12px]">
              Disclaimer: This is a consultative report only and is not intended
              to be a definitive diagnosis Or treatment plan. Necessary
              diagnostic tests would be required and, based on the findings, our
              experienced Implantologists will suggest whether add-on clinical
              procedures (bone-augmentation procedures) will be recommended or
              not.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-dezy-blue py-8 px-4">
          <div className="mx-4 bg-dezy-lightCream  mx-auto md:max-w-lg px-8 py-6 rounded-4xl my-8 ">
            <div className="bg-white  mx-auto w-full md:max-w-lg px-8 py-6 rounded-4xl border border-[#F3E9E6]">
              {' '}
              <img
                src="/post-consultation-report/case.png"
                alt="case"
                className=""
              />
            </div>
            <p className="text-[16px] md:text-[18px] text-dezy-blue mt-4">
              We are analysing your case
            </p>
            <p className="mt-2 text-[12px] md:text-[16px]">
              Our expert orthodontists/ implantologists are reviewing your case,
              and you will be notified when the detailed report is ready.
              Alternatively, you can visit back in 48 hours to see the detailed
              diagnosis, post-treatment outcome visualization, pricing details
              etc.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function Quote({ content }) {
  return (
    <div className="bg-[#FAF7F6] rounded-xl px-6 pb-6 pt-8 relative border border-[#F3E9E6]">
      <div className="rounded-full bg-[#E0CDB3] p-3 max-w-max absolute -top-5">
        <img
          src="/post-consultation-report/quote.svg"
          className="h-4 w-4"
          alt=""
        />
      </div>
      “
      {content}
      ”
    </div>
  );
}

const treatmentInclusionOptions = [
  'Customised treatment plan made by a panel of in-house Orthodontist with an average experience of 7 years.',
  'Complimentary Consultation and FREE Scan.',
  'At clinic aligner placement by our expert Orthodontist.',
  'Remote/in-clinic monitoring by an experienced Orthodontist till the end of your aligner treatment.',
  'One set of Dezy clear retainers (required post treatment Completion).',
];

function InclusionDrawerContent() {
  return (
    <div className="px-4 max-w-xl">
      <p className="text-dezy-blue mb-6 text-[12px] md:text-[16px]">
        Treatment Inclusions
      </p>
      {treatmentInclusionOptions.map((item) => (
        <div className="flex gap-2 mb-4">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-6 w-6 flex-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Body1 className="-mt-1">{item}</Body1>
        </div>
      ))}
      <Body2 className="text-[#757575] my-8">
        *Disclaimer: This is a computer based virtual treatmentsetup, and may or
        may not resemble the patient’s actualcondition. The final treatment may
        vary from the simulationresults.
      </Body2>
    </div>
  );
}
