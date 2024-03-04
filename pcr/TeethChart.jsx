import AdultChart from './teethChart/AdultChart';
import NotAdultChart from './teethChart/NotAdultChart';
import { strokeColor } from './teethMappings';

export default function TeethChart({
  suggestedTreatmentName,
  selectedTeethType,
  selectedIndex,
}) {
  return (
    <div className="p-1 mt-2 flex flex-1 bg-white justify-center rounded-b-[2rem] w-full">
      <div className="flex w-full p-[1rem] rounded-[1rem] bg-dezy-lavenderBlue relative justify-center items-center">
        {suggestedTreatmentName && (
          <div
            className="text-center abs-center px-2 py-1 text-white rounded-[5rem] bg-[#6693FA] text-[0.8rem] min-w-[8rem] max-w-[8rem] one-line-text"
            style={{ background: strokeColor[selectedIndex % 6] }}
          >
            {suggestedTreatmentName}
          </div>
        )}
        <img
          alt="direction arrows"
          src="/global/directionArrows.svg"
          className="absolute left-[1rem] top-[1rem] w-[3.5rem] h-auto"
        />
        {selectedTeethType === 'adult' ? <AdultChart /> : <NotAdultChart />}
      </div>
    </div>
  );
}
