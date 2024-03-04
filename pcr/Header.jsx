import Body1 from 'util/Body1';
import H4 from 'util/H4';
import H5 from 'util/H5';
import H6 from 'util/H6';
import _get from 'lodash/get';
import Link from 'next/link';
import { Pic } from 'util/Pic';
import _capitalize from 'lodash/capitalize';

export default function Header({ patientDetails, Doctor, appointmentDetails }) {
  const patientName = _get(appointmentDetails, 'customer_name', 'NA');
  const patientLastName = _get(patientDetails, 'last_name', 'Na');
  const patientGender = _get(patientDetails, 'gender', 'NA');
  const patientAge = _get(patientDetails, 'age', '');
  const profilePic = _get(patientDetails, 'profilePic', '/myProfile/male.png');
  const doctorName = _get(Doctor, 'name', '');
  const doctorImage = _get(Doctor, 'profilePhoto.url', '');
  const doctorCity = _get(Doctor, 'city.name', '');
  const doctorDegree = _get(Doctor, 'degree', '');
  const doctorPage = _get(Doctor, 'urlSlug', '');

  return (
    <div className="w-full pt-8 bg-dezy-lightCream">
      <H5 Element="h1" className="mb-6 text-dezy-blue">
        Post Consultation Report for
      </H5>
      <div className="bg-dezy-lavenderBlue border flex gap-6 border-[#DAC1FF]  rounded-3xl py-6 px-8 w-full">
        <img
          src="/post-consultation-report/patientAvatar.svg"
          className="relative rounded-full h-16 w-16 bg-slate-300 mt-1"
        />
        <div className="">
          <H4 Element="h2" className="text-dezy-blue">
            {_capitalize(patientName)}
          </H4>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 mt-2">
              <Body1 className="text-[#757575]">Age:</Body1>
              <Body1 className="font-bold">{patientAge}</Body1>
            </div>
            <div className="flex gap-2 mt-2">
              <Body1 className="text-[#757575]">Gender:</Body1>
              <Body1 className="font-bold">{_capitalize(patientGender)}</Body1>
            </div>
          </div>
        </div>
      </div>
      {doctorName && doctorDegree && (
        <div className="border flex gap-6 items-center justify-between border-[#F3E9E6] rounded-3xl py-6 px-8 bg-white w-full mt-6">
          <div className="">
            <div className="flex gap-2">
              <H5 className="text-dezy-blue">{doctorName}</H5>
              <H6 className="text-[#757575]">
                (
                {doctorDegree}
                )
              </H6>
            </div>
            <Body1 className="my-2">{doctorCity}</Body1>
            <Link
              className="underline cursor-pointer text-[#AF78FE] underline-offset-2"
              href={`/meet-your-dentists/${doctorPage}`}
            >
              View bio
            </Link>
          </div>
          <div className="relative rounded-xl h-24 w-24 bg-slate-300">
            <Pic src={doctorImage} alt="doctor pic" />
          </div>
        </div>
      )}
    </div>
  );
}
