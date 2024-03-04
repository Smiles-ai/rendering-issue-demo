import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
// import NeedHelp from './NeedHelp';
import DidYouKnow from './DidYouKnow';
import Header from './Header';
import Outcome from './Outcome';
import SuggestedTreatments2 from './SuggestedTreatments2';
import TreatmentsPlanned from './TreatmentsPlanned';

function filterOutZeroCost(data) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    // Check if total_cost is not "0"
    if (value.total_cost !== '0') {
      acc[key] = value; // Include this object in the result
    }
    return acc;
  }, {});
}

function checkAllForOnlyConsultationSuggestions(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const obj = data[key];

      if (
        !(
          obj.hasOwnProperty('suggestions')
          && Array.isArray(obj.suggestions)
          && obj.suggestions.every((suggestion) => suggestion === 'Consultation')
        )
      ) {
        // If any object does not meet the criteria, return false
        return false;
      }
    }
  }
  return true;
}

export default function PostConsultaionReport() {
  const router = useRouter();
  // const { uid, aid } = router.query;
  const aid = 123;
  const uid = 123;
  const [treatmentSuggestion, setTreatmentSuggestion] = useState({
    primary: [],
    adult: [],
  });

  const [selectedTeethType, setSelectedTeethType] = useState('primary');
  const [clinicReport, setClinicReport] = useState({});
  const [fetchedDoctor, setFetchedDoctor] = useState({});
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [treatments, setTreatments] = useState({});
  const [showOutcomeSection, setShowOutcomeSection] = useState(false);
  const [showSuggestedTreatmentSection, setShowSuggestedTreatmentSection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTreatmentPlannedSection, setShowTreatmentPlannedSection] = useState(false);

  // const checkSuggestionTypes = (suggestions, typesToCheck) => suggestions.some((suggestion) => typesToCheck.includes(suggestion.type));

  // const checkAllTreatment = (dataList) => {
  //   console.log('dataList', dataList);
  //   for (const obj of dataList) {
  //     const key = Object.keys(obj)[0];
  //     const { suggestions } = obj[key];
  //     if (!Array.isArray(suggestions)) {
  //       return false;
  //     }

  //     for (const suggestion of suggestions) {
  //       if (suggestion !== 'Consultation') {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // };

  const selectTeethType = (type) => () => {
    setSelectedTeethType(type);
  };
  const patientDetails = _get(clinicReport, 'user', {});

  const isAdultTeeth = (teeth) => Number(teeth)
    || [
      'all_upper_left',
      'all_upper_right',
      'all_lower_left',
      'all_lower_right',
    ].includes(teeth);

  const isPrimaryTeeth = (teeth) => (!Number(teeth) && !teeth.includes('_'))
    || [
      'all_upper_left_primary',
      'all_upper_right_primary',
      'all_lower_left_primary',
      'all_lower_right_primary',
    ].includes(teeth);

  const getTreatmentData = useCallback(async () => {
    // const clincReport = await fetchData('common/u/post-consultation-report', {
    //   uid,
    //   aid,
    // });

    const clincReport = {
      user: {
        gender: 'female',
        city: 'bangalore',
        age: '64',
      },
      doctor: [
        {
          eir_email: null,
          set_city_list: [],
          email: 'dr.gulsheen@doc32.in',
          city: 'central',
          active: true,
          mobile: '+919051866007',
          gsi_pk_3: 'emp_role:other',
          updated_by: 'bhanu.p@doc32.in',
          doctor_type: null,
          gsi_pk_1: 'email:dr.gulsheen@doc32.in',
          gsi_pk_2: 'locus_agent_id:',
          sm_tl_email: null,
          sk: 'data',
          eid: '3c2611d6-893c-479f-8df1-b9e1e2c9d48a',
          created_at: '2023-05-25T11:21:40+05:30',
          gsi_sk_3: 'active:central',
          gsi_sk_2: 'data',
          gsi_sk_1: 'data',
          item_type: 'emp',
          updated_at: '2023-05-25T11:21:40+05:30',
          last_name: 'Kaur',
          set_purpose: [],
          first_name: 'Gulsheen',
          pk: 'eid:3c2611d6-893c-479f-8df1-b9e1e2c9d48a',
          locus_agent_id: '',
          emp_role: 'other',
        },
      ],
      suggestions: [
        {
          total_amount: '4499',
          type: 'Crown - PFM 5yrs Warranty',
          status: 'pending',
          teeth_list: [
            '43',
            '44',
            '41',
            '42',
            '45',
            '33',
            '34',
            '31',
            '32',
            '35',
          ],
          implant_plan_type: '',
          implant_count: '',
          crown_count: '',
          crown_type: '',
          plan_type: '',
        },
        {
          total_amount: '5999',
          type: 'Root Canal Treatment - posterior',
          status: 'pending',
          teeth_list: ['27'],
          implant_plan_type: '',
          implant_count: '',
          crown_count: '',
          crown_type: '',
          plan_type: '',
        },
        {
          total_amount: '2999',
          type: 'Removable Partial Denture- upto 3 teeth',
          status: 'pending',
          teeth_list: ['46', '47'],
          implant_plan_type: '',
          implant_count: '',
          crown_count: '',
          crown_type: '',
          plan_type: '',
        },
        {
          total_amount: '0',
          type: 'Consultation',
          status: 'completed',
          teeth_list: [
            'all_upper_left',
            'all_upper_right',
            'all_lower_left',
            'all_lower_right',
          ],
          implant_plan_type: '',
          implant_count: '',
          crown_count: '',
          crown_type: '',
          plan_type: '',
        },
      ],
      appointment: {
        d0_disposition_at: '1707381500',
        scan_completed_by: 'dr.gulsheen@doc32.in',
        self_booked: false,
        otp: '207040',
        appointment_platform: 'self',
        country: 'IN',
        customer_mobile: '+919113649193',
        customer_photo: {
          frontal_lateral_view:
            '1707380430-LWD8I4AE37/customer_photo/frontal_lateral_view.jpeg',
          frontal_smile:
            '1707380430-LWD8I4AE37/customer_photo/frontal_smile.jpeg',
          frontal_view:
            '1707380430-LWD8I4AE37/customer_photo/frontal_view.jpeg',
          lateral_view:
            '1707380430-LWD8I4AE37/customer_photo/lateral_view.jpeg',
          left_lateral_view:
            '1707380430-LWD8I4AE37/customer_photo/left_lateral_view.jpeg',
          lower_occlusal_view:
            '1707380430-LWD8I4AE37/customer_photo/lower_occlusal_view.jpeg',
          oblique_smile:
            '1707380430-LWD8I4AE37/customer_photo/oblique_smile.jpeg',
          oblique_view:
            '1707380430-LWD8I4AE37/customer_photo/oblique_view.jpeg',
          photo_070d0e519e: {
            description: 'prescription',
            label: 'prescription',
            updated_at: '1707387936',
            key: '1707380430-LWD8I4AE37/customer_photo/af266616-afd0-408a-bde2-342a4b707e68.jpg',
          },
          photo_aedf630c72: {
            description: 'declaration',
            label: 'declaration',
            updated_at: '1707387957',
            key: '1707380430-LWD8I4AE37/customer_photo/6773c1c1-1d33-4872-b0e4-3515ccaffa3b.jpg',
          },
          right_lateral_view:
            '1707380430-LWD8I4AE37/customer_photo/right_lateral_view.jpeg',
          upper_occlusal_view:
            '1707380430-LWD8I4AE37/customer_photo/upper_occlusal_view.jpeg',
        },
        date: '2024-02-08',
        gsi_pk_5: 'aid:1707380430-LWD8I4AE37',
        customer_photo_updated_at: '1707387957',
        href: 'https://smiles.retool.com/apps/7850670c-b8e4-11ed-852d-83b11a2befa5/v4/qualification-scan-book?lead_source=website_ppc&uid=ap-south-1%3A0f2de383-8c58-4ce0-ba0d-b96b798431fd',
        customer_alt_mobile: '+919113649193',
        gsi_pk_3: 'uid:ap-south-1:0f2de383-8c58-4ce0-ba0d-b96b798431fd',
        appointment_duration: '1800',
        gsi_pk_4: 'cid:Hw96O0vl4X',
        gsi_pk_1: 'doctor_email:dr.gulsheen@doc32.in',
        sk: 'appointment:1707380430-LWD8I4AE37',
        aid: '1707380430-LWD8I4AE37',
        customer_email: 'malini@gmail.com',
        cid: 'Hw96O0vl4X',
        duration: '1800',
        eid: '',
        appointment_type: 'clinic',
        created_at: '2024-02-08T13:50:30.159124+05:30',
        mid: 'fc7351b7e9b248a48666bdafbce054b7',
        pcr_report_sent: true,
        appointment_confirmation_time: '2024-02-08T08:20:32.287945+00:00',
        source: 'retool/qualification',
        address:
          'Ground Floor, HM Rochester Building, 197/1, 2nd Stage, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038',
        end_time: '1707384600',
        customer_age: '64',
        uid: 'ap-south-1:0f2de383-8c58-4ce0-ba0d-b96b798431fd',
        is_static_scanner: true,
        item_type: 'appointment',
        updated_at: '2024-02-08T18:34:53.745500+05:30',
        note: '',
        updated_at_ts: '1707397493',
        created_at_ts: '1707380430',
        lead_source: 'website_ppc',
        slot: {
          start: '2024-02-08T14:30:00+05:30',
          overlapping_apt_count: '1',
          end: '2024-02-08T15:00:00+05:30',
        },
        pk: 'uid:ap-south-1:0f2de383-8c58-4ce0-ba0d-b96b798431fd',
        customer_photo_updated_by: 'dr.gulsheen@doc32.in',
        purpose: 'clinic_visit',
        d0_disposition: 'Confirmed',
        sed_questionnaire: {
          chief_complaint: 'patient looking for cap and implants',
          customer_age: '64',
          customer_email: 'malini@gmail.com',
          customer_gender: 'female',
          customer_name: 'Malini ',
          habits: ['NA'],
          medical_history: ['Diabetes'],
          past_medications: 'under medication',
          scan_remarks:
            'A 64 year old female patient by name malini visited the clinic complaining missing teeth on her lower front teeth region patient is diabetic taking insulin and medications also hypertensive cardiac stunt placed on blood thinners, on examination 31 32 41 42 43 46 47 missing, attrition wrt 27 noted advised for long span bridge from 34 33 32 31 41 42 43 44 45 35 advised rpd wrt 46 47 rct wrt 27 over all quotation given for 64000',
        },
        pcr_generated_by: 'system',
        appointment_confirmation_source: 'system',
        complaint_list: ['fractured_teeth'],
        created_by: 'poornima.g@doc32.in',
        appointment_confirmed_by: 'auto confirm',
        city: 'bangalore',
        landmark: 'Opposite Axis Bank',
        active: true,
        appointment_status: 'completed',
        latLon: {
          lat: '12.977623',
          lon: '77.636596',
        },
        is_signature_clinic: true,
        sig_clinic_booking: true,
        clinic_name: 'Dezy Dental Clinic In Indiranagar, Bangalore',
        forced: false,
        secondary_doctors: [],
        customer_whatsapp: '+919113649193',
        pcr_report_sent_at: '1707397493',
        gsi_sk_3: 'appointment:1707382800',
        gsi_sk_1: 'appointment:1707382800',
        zone: ['zone3'],
        start_time: '1707382800',
        scan_done_at: '2024-02-08T18:19:43+05:30',
        utm_lead_type: null,
        customer_gender: 'female',
        complaint_note:
          'pt having broken teeth and missing teeth looking for RCT and Dentures ',
        clinic_note: 'consultation done',
        gsi_sk_5: 'data',
        gsi_sk_4: 'appointment:1707382800',
        doctor_email: 'dr.gulsheen@doc32.in',
        customer_name: 'malinia560 NA',
        speciality: 'general_dentist',
      },
      treatments: {
        '1707391372rfBZxKbf': {
          total_cost: '0',
          total_discount: '0',
          payable_amount: 0,
          suggestions: ['Consultation'],
          is_paylink_created: false,
          created_at: '1707391372',
          total_payment_received: '0',
          total_payment_refunded: '0',
        },
      },
    };

    // console.log('clincReport', clincReport);

    // const fetchedDoc = await fetchFromDatoCms(doctorFetchQuery, {
    //   did: clincReport?.doctor?.[0]?.eid,
    // });

    const fetchedDoc = {
      data: {
        doctor: {
          city: {
            name: 'Bangalore',
          },
          degree: 'BDS',
          specializations: ['General Dentistry '],
          profilePhoto: {
            url: 'https://www.datocms-assets.com/52536/1688020461-website-doc-28.png',
          },
          urlSlug: 'dr-gulsheen',
          name: 'Dr. Gulsheen',
        },
      },
    };

    setFetchedDoctor(fetchedDoc?.data?.doctor);
    const allSuggetions = _get(clincReport, 'suggestions', []);
    const appointment = _get(clincReport, 'appointment', {});
    const treatments = _get(clincReport, 'treatments', {});
    setAppointmentDetails(appointment);
    setShowOutcomeSection(
      ['aligner_scan', 'implant_scan'].includes(appointment?.purpose),
    );

    const _treatmentSuggestion = {
      primary: [],
      adult: [],
    };

    allSuggetions.forEach((treatment = {}) => {
      if (treatment.status !== 'cancelled') {
        const teethList = _get(treatment, 'teeth_list', []);
        const type = _get(treatment, 'type', []);
        const primaryTeeth = [];
        const adultTeeth = [];
        if (type !== 'Consultation') {
          teethList?.forEach((teeth) => {
            if (isAdultTeeth(teeth)) {
              adultTeeth.push(teeth);
            }
            if (isPrimaryTeeth(teeth)) {
              primaryTeeth.push(teeth);
            }
          });
          if (primaryTeeth.length > 0) {
            _treatmentSuggestion.primary.push({
              ...treatment,
              teeth_list: primaryTeeth,
            });
          }
          if (adultTeeth.length > 0) {
            _treatmentSuggestion.adult.push({
              ...treatment,
              teeth_list: adultTeeth,
            });
          }

          if (
            teethList.length === 0
            && (type === 'aligner' || type === 'brace')
          ) {
            _treatmentSuggestion.primary.push({ ...treatment, teeth_list: [] });
            _treatmentSuggestion.adult.push({ ...treatment, teeth_list: [] });
          }
        }
        setSelectedTeethType(primaryTeeth.length > 0 ? 'primary' : 'adult');
      }
    });

    // console.log('_treatmentSuggestion', _treatmentSuggestion);
    setClinicReport(clincReport);
    setTreatmentSuggestion(_treatmentSuggestion);
    setTreatments(treatments);
    setShowSuggestedTreatmentSection(
      !allSuggetions.every(
        (suggestion) => suggestion.type === 'Consultation',
      )
        && (_treatmentSuggestion.adult.length > 0
          || _treatmentSuggestion.primary.length > 0),
    );
    setShowTreatmentPlannedSection(
      !checkAllForOnlyConsultationSuggestions(treatments)
        && !allSuggetions.every(
          (suggestion) => suggestion.type === 'Consultation',
        )
        && Object.keys(treatments).length > 0,
    );
  }, [uid, aid]);

  useEffect(() => {
    if (uid && aid) {
      getTreatmentData();

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [router.isReady, uid, aid, getTreatmentData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center text-[1rem]">
        {isLoading ? 'Loading...' : 'No Data Available'}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-dezy-lighcream border-dezy-cream rounded-[2rem] w-full items-center">
      <div className="w-full max-w-[35rem]">
        <div className="bg-lightCream pb-12 mx-auto w-full px-4 relative bg-dezy-lightCream">
          <Header
            patientDetails={patientDetails}
            Doctor={fetchedDoctor}
            appointmentDetails={appointmentDetails}
          />
          {showSuggestedTreatmentSection && (
            <SuggestedTreatments2
              treatmentSuggestion={treatmentSuggestion}
              selectedTeethType={selectedTeethType}
              selectTeethType={selectTeethType}
            />
          )}
        </div>
        {showOutcomeSection && (
          <Outcome
            aid={aid}
            uid={uid}
            patientDetails={patientDetails}
            appointmentDetails={appointmentDetails}
            treatmentSuggestion={treatmentSuggestion[selectedTeethType]}
          />
        )}
        {showTreatmentPlannedSection
          && Object.keys(filterOutZeroCost(treatments)).length > 0 && (
            <TreatmentsPlanned
              uid={uid}
              treatments={filterOutZeroCost(treatments)}
            />
        )}
        <DidYouKnow />
        {/* <NeedHelp /> */}
      </div>
    </div>
  );
}
