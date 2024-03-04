// import BeforeAfter from 'components/BeforeAfter';
import Body1 from 'util/Body1';
import H6 from 'util/H6';
// import ResponsiveDrawer from 'dezy/Components/beta/LightsOutLoginFlow/ResponsiveDrawer';
import { useEffect, useMemo, useState } from 'react';
import TeethChart from './TeethChart';
import { fillColor, strokeColor, toothMapping } from './teethMappings';

const clinicTreatmentMapping = require('util/maping.json');

export const getTreatmentName = (teethList, type) => {
  if (type === 'aligner' || type === 'brace') {
    return 'Full Mouth';
  }

  const teethMapping = {
    'all_lower_left, all_lower_right, all_upper_left, all_upper_right':
      'Full Arch',
    'all_upper_left, all_upper_right': 'Upper Arch',
    'all_lower_left, all_lower_right': 'Lower Arch',
    'all_upper_left_primary, all_upper_right_primary, all_lower_left_primary, all_lower_right_primary':
      'Full Primary Arch',
    'all_upper_left_primary, all_upper_right_primary': 'Upper Primary Arch',
    'all_lower_left_primary, all_lower_right_primary': 'Lower Primary Arch',

    all_upper_left: 'All Upper Left',
    all_upper_right: 'All Upper Right',
    all_lower_left: 'All Lower Left',
    all_lower_right: 'All Lower Right',
    all_upper_left_primary: 'All Upper Left Primary',
    all_upper_right_primary: 'All Upper Right Primary',
    all_lower_left_primary: 'All Lower Left Primary',
    all_lower_right_primary: 'All Lower Right Primary',
  };

  const teethName = teethList.sort().join(', ');
  return teethMapping[teethName] || teethName;
};

export default function SuggestedTreatments({
  treatmentSuggestion,
  selectedTeethType,
  selectTeethType,
}) {
  // console.log('suggested treatment', selectedTeethType);
  const [totalSuggestions, setTotalSuggestions] = useState(0);
  const [adultSuggestions, setAdultSuggestions] = useState([]);
  const [primarySuggestions, setPrimarySuggestions] = useState([]);
  const [selectedSuggestionType, setSelectedSuggestionType] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [suggestedTreatmentName, setSuggestedTreatmentName] = useState('');
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const selectSuggestion = useMemo(
    () => (suggestion, index) => () => {
      const toothList = suggestion?.teeth_list || [];
      let tooth = [];
      toothList.forEach((teeth) => {
        const mappedTooth = toothMapping[teeth]
          && toothMapping[teeth].length > 0
          && toothMapping[teeth];
        tooth = [...tooth, ...(mappedTooth || [teeth])];
      });
      const { type } = suggestion;

      if (type === 'aligner' || type === 'brace') {
        tooth = [
          ...toothMapping['all_upper_left, all_upper_right'],
          ...toothMapping['all_lower_left, all_lower_right'],
        ];
      }

      if (type !== 'Consultation') {
        let styleText = '';
        tooth.forEach((teeth) => {
          styleText = `${styleText}
                    #t-${teeth} .tFill {
                    fill: ${fillColor[index % 6]};
                    }
                    #t-${teeth} .tStroke {
                        stroke: ${strokeColor[index % 6]};
                        }
                `;
        });
        const style = document.createElement('style');
        style.innerHTML = styleText;
        style.id = 'test';

        const oldStyleTag = document.getElementById('test');
        if (oldStyleTag) {
          document.getElementsByTagName('head')[0].removeChild(oldStyleTag);
        }
        document.head.appendChild(style);
        setSuggestedTreatmentName(suggestion?.type || '');
        setSelectedIndex(index);
      }
    },
    [],
  );

  useEffect(() => {
    setAdultSuggestions(treatmentSuggestion.adult);
    setPrimarySuggestions(treatmentSuggestion.primary);
    setSelectedSuggestionType(treatmentSuggestion[selectedTeethType]);

    const newTotalSuggestions = treatmentSuggestion?.[`${selectedTeethType}.length`] || 0;

    const newSelectedSuggestion = treatmentSuggestion?.[`${selectedTeethType}.[0]`] || '';

    setTotalSuggestions(newTotalSuggestions);

    const newSuggestedTreatmentName = newSelectedSuggestion?.type || '';
    setSuggestedTreatmentName(newSuggestedTreatmentName);

    // Reset other states if needed
    setShowAllSuggestions(false);

    selectSuggestion(newSelectedSuggestion, 0, false)();
  }, [treatmentSuggestion, selectedTeethType, selectSuggestion]);

  return (
    <div className="bg-[#F3E9E6] pb-12 rounded-4xl">
      <div className="bg-white p-6 rounded-4xl mt-8 shadow">
        <div className="flex justify-between items-center pt-4 px-4 rounded-[1.5rem] mb-6">
          <p className="text-dezy-blue text-[16px]  md:text-[18px]">
            Suggested Treatments
          </p>

          {adultSuggestions.length > 0 && primarySuggestions.length > 0 && (
            <div className="flex border border-dezy-lightBlue rounded-[1rem] overflow-hidden">
              {adultSuggestions.length > 0 && (
                <div
                  className={`text-[0.7rem] py-1 flex px-2 cursor-pointer ${
                    selectedTeethType === 'adult'
                      ? 'bg-dezy-lightBlue text-white'
                      : 'bg-white'
                  }`}
                  onClick={selectTeethType('adult')}
                >
                  Adult
                </div>
              )}
              {primarySuggestions.length > 0 && (
                <div
                  className={`text-[0.7rem] py-1 flex px-2 cursor-pointer ${
                    selectedTeethType === 'primary'
                      ? 'bg-dezy-lightBlue text-white'
                      : 'bg-white'
                  }`}
                  onClick={selectTeethType('primary')}
                >
                  Primary
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {selectedSuggestionType.map((item, index) => (
            <div
              className={`${
                selectedIndex === index
                  ? 'border border-dezy-lightBlue bg-dezy-cream'
                  : 'border border-dezy-cream bg-dezy-mediumCream'
              } col-span-1 px-4 py-4 rounded-xl border-2 cursor-pointer`}
              onClick={selectSuggestion(item, index)}
              style={{ color: strokeColor[index % 6] }}
            >
              <div className="font-bold text-xs leading-tight text-center two-line-text overflow-hidden overflow-ellipsis whitespace-nowrap">
                {getTreatmentName(item.teeth_list, item.type)}
              </div>
              <p className="mt-1 text-dezy-blue text-center text-xs leading-tight text-[12px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {item.type}
              </p>
            </div>
          ))}
        </div>
        <TeethChart
          suggestedTreatmentName={suggestedTreatmentName}
          selectedTeethType={selectedTeethType}
          selectedIndex={selectedIndex}
        />
      </div>

      {selectedSuggestionType.map((item, index) => {
        if (
          showAllSuggestions
          || (index === 0 && index === selectedIndex)
          || index === selectedIndex
        ) {
          const TreatmentName = clinicTreatmentMapping?.[`${item.type}.name`] || `${item.type}`;
          const TreatmentDescription = clinicTreatmentMapping?.[`${item.type}.description`] || '';
          const TreatmentPrice = clinicTreatmentMapping?.[`${item.type}.price`] || '';
          const TreatmentKnowMore = clinicTreatmentMapping?.[`${item.type}.knowMore`] || '';
          const TreatmentBeforeImage = clinicTreatmentMapping?.[`${item.type}.preImage`] || '';
          const TreatmentAfterImage = clinicTreatmentMapping?.[`${item.type}.postImage`] || '';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} onClick={selectSuggestion(item, index)}>
              <div className="px-6">
                <div className="bg-white mt-8 rounded-xl flex gap-4 justify-between pl-6 pr-4 py-2 items-center">
                  <H6 className="text-dezy-blue">{TreatmentName}</H6>
                </div>
                {TreatmentDescription && (
                  <p className="mt-4 mb-6 text-[12px]  md:text-[16px]">
                    {TreatmentDescription}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 px-6 mb-6">
                {TreatmentPrice && (
                  <div className="bg-white p-3 rounded-xl flex flex-col justify-center">
                    <p className="text-center text-[10px] md:text-[12px]">
                      Starts at
                    </p>
                    <p className="text-center text-dezy-blue text-[12px]  md:text-[14px]">
                      INR
                      {' '}
                      {TreatmentPrice}
                    </p>
                  </div>
                )}

                {TreatmentBeforeImage
                  && TreatmentAfterImage
                  && TreatmentBeforeImage !== TreatmentAfterImage && (
                    <div className="flex-1 relative cursor-pointer rounded-xl bg-dezy-lightCream py-4 px-2 text-[0.8rem] grid-item flex items-center justify-center flex-col">
                      <p className="text-dezy-blue text-center text-[10px]  md:text-[12px]">
                        View Sample Images
                      </p>
                    </div>
                )}

                {TreatmentKnowMore && (
                  <a href={TreatmentKnowMore} target="_blank" rel="noreferrer">
                    <div className="bg-white p-3 rounded-xl flex flex-col justify-center h-full">
                      <p className="text-center underline underline-offset-2 text-[10px] md:text-[12px]">
                        Know more
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          );
        }
        return null;
      })}

      {!showAllSuggestions && (
        <div className="text-dezy-blue flex gap-1 items-center max-w-max mx-auto cursor-pointer ">
          <Body1
            className="text-center underline underline-offset-2 text-[12px]  md:text-[16px]"
            onClick={() => {
              setShowAllSuggestions(true);
            }}
          >
            View all
            {' '}
            {totalSuggestions}
            {' '}
            suggestions
          </Body1>
          <svg
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
