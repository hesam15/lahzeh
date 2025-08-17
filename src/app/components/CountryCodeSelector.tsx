'use client';

import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import Image from "next/image";

// تعریف تایپ برای پراپ‌ها
interface CountryCodeSelectorProps {
  selectedCountry: string; // Stores iso code (e.g., "US", "CA")
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}

// لیست کدهای کشور با نام‌های انگلیسی
const countryCodes = [
  { code: "+93", name: "Afghanistan", iso: "AF" },
  { code: "+355", name: "Albania", iso: "AL" },
  { code: "+213", name: "Algeria", iso: "DZ" },
  { code: "+376", name: "Andorra", iso: "AD" },
  { code: "+244", name: "Angola", iso: "AO" },
  { code: "+54", name: "Argentina", iso: "AR" },
  { code: "+374", name: "Armenia", iso: "AM" },
  { code: "+61", name: "Australia", iso: "AU" },
  { code: "+43", name: "Austria", iso: "AT" },
  { code: "+994", name: "Azerbaijan", iso: "AZ" },
  { code: "+973", name: "Bahrain", iso: "BH" },
  { code: "+880", name: "Bangladesh", iso: "BD" },
  { code: "+375", name: "Belarus", iso: "BY" },
  { code: "+32", name: "Belgium", iso: "BE" },
  { code: "+501", name: "Belize", iso: "BZ" },
  { code: "+229", name: "Benin", iso: "BJ" },
  { code: "+975", name: "Bhutan", iso: "BT" },
  { code: "+591", name: "Bolivia", iso: "BO" },
  { code: "+387", name: "Bosnia and Herzegovina", iso: "BA" },
  { code: "+267", name: "Botswana", iso: "BW" },
  { code: "+55", name: "Brazil", iso: "BR" },
  { code: "+359", name: "Bulgaria", iso: "BG" },
  { code: "+226", name: "Burkina Faso", iso: "BF" },
  { code: "+257", name: "Burundi", iso: "BI" },
  { code: "+855", name: "Cambodia", iso: "KH" },
  { code: "+237", name: "Cameroon", iso: "CM" },
  { code: "+1", name: "Canada", iso: "CA" },
  { code: "+238", name: "Cape Verde", iso: "CV" },
  { code: "+236", name: "Central African Republic", iso: "CF" },
  { code: "+235", name: "Chad", iso: "TD" },
  { code: "+56", name: "Chile", iso: "CL" },
  { code: "+86", name: "China", iso: "CN" },
  { code: "+57", name: "Colombia", iso: "CO" },
  { code: "+269", name: "Comoros", iso: "KM" },
  { code: "+242", name: "Congo", iso: "CG" },
  { code: "+243", name: "Democratic Republic of the Congo", iso: "CD" },
  { code: "+506", name: "Costa Rica", iso: "CR" },
  { code: "+385", name: "Croatia", iso: "HR" },
  { code: "+53", name: "Cuba", iso: "CU" },
  { code: "+357", name: "Cyprus", iso: "CY" },
  { code: "+420", name: "Czech Republic", iso: "CZ" },
  { code: "+45", name: "Denmark", iso: "DK" },
  { code: "+253", name: "Djibouti", iso: "DJ" },
  { code: "+593", name: "Ecuador", iso: "EC" },
  { code: "+20", name: "Egypt", iso: "EG" },
  { code: "+503", name: "El Salvador", iso: "SV" },
  { code: "+240", name: "Equatorial Guinea", iso: "GQ" },
  { code: "+291", name: "Eritrea", iso: "ER" },
  { code: "+372", name: "Estonia", iso: "EE" },
  { code: "+251", name: "Ethiopia", iso: "ET" },
  { code: "+679", name: "Fiji", iso: "FJ" },
  { code: "+358", name: "Finland", iso: "FI" },
  { code: "+33", name: "France", iso: "FR" },
  { code: "+241", name: "Gabon", iso: "GA" },
  { code: "+220", name: "Gambia", iso: "GM" },
  { code: "+995", name: "Georgia", iso: "GE" },
  { code: "+49", name: "Germany", iso: "DE" },
  { code: "+233", name: "Ghana", iso: "GH" },
  { code: "+30", name: "Greece", iso: "GR" },
  { code: "+502", name: "Guatemala", iso: "GT" },
  { code: "+224", name: "Guinea", iso: "GN" },
  { code: "+245", name: "Guinea-Bissau", iso: "GW" },
  { code: "+509", name: "Haiti", iso: "HT" },
  { code: "+504", name: "Honduras", iso: "HN" },
  { code: "+852", name: "Hong Kong", iso: "HK" },
  { code: "+36", name: "Hungary", iso: "HU" },
  { code: "+354", name: "Iceland", iso: "IS" },
  { code: "+91", name: "India", iso: "IN" },
  { code: "+62", name: "Indonesia", iso: "ID" },
  { code: "+98", name: "Iran", iso: "IR" },
  { code: "+964", name: "Iraq", iso: "IQ" },
  { code: "+353", name: "Ireland", iso: "IE" },
  { code: "+972", name: "Israel", iso: "IL" },
  { code: "+39", name: "Italy", iso: "IT" },
  { code: "+225", name: "Ivory Coast", iso: "CI" },
  { code: "+81", name: "Japan", iso: "JP" },
  { code: "+962", name: "Jordan", iso: "JO" },
  { code: "+7", name: "Kazakhstan", iso: "KZ" },
  { code: "+254", name: "Kenya", iso: "KE" },
  { code: "+686", name: "Kiribati", iso: "KI" },
  { code: "+965", name: "Kuwait", iso: "KW" },
  { code: "+996", name: "Kyrgyzstan", iso: "KG" },
  { code: "+856", name: "Laos", iso: "LA" },
  { code: "+371", name: "Latvia", iso: "LV" },
  { code: "+961", name: "Lebanon", iso: "LB" },
  { code: "+266", name: "Lesotho", iso: "LS" },
  { code: "+231", name: "Liberia", iso: "LR" },
  { code: "+218", name: "Libya", iso: "LY" },
  { code: "+423", name: "Liechtenstein", iso: "LI" },
  { code: "+370", name: "Lithuania", iso: "LT" },
  { code: "+352", name: "Luxembourg", iso: "LU" },
  { code: "+853", name: "Macao", iso: "MO" },
  { code: "+389", name: "North Macedonia", iso: "MK" },
  { code: "+261", name: "Madagascar", iso: "MG" },
  { code: "+265", name: "Malawi", iso: "MW" },
  { code: "+60", name: "Malaysia", iso: "MY" },
  { code: "+960", name: "Maldives", iso: "MV" },
  { code: "+223", name: "Mali", iso: "ML" },
  { code: "+356", name: "Malta", iso: "MT" },
  { code: "+692", name: "Marshall Islands", iso: "MH" },
  { code: "+222", name: "Mauritania", iso: "MR" },
  { code: "+230", name: "Mauritius", iso: "MU" },
  { code: "+52", name: "Mexico", iso: "MX" },
  { code: "+691", name: "Micronesia", iso: "FM" },
  { code: "+373", name: "Moldova", iso: "MD" },
  { code: "+377", name: "Monaco", iso: "MC" },
  { code: "+976", name: "Mongolia", iso: "MN" },
  { code: "+382", name: "Montenegro", iso: "ME" },
  { code: "+212", name: "Morocco", iso: "MA" },
  { code: "+258", name: "Mozambique", iso: "MZ" },
  { code: "+95", name: "Myanmar", iso: "MM" },
  { code: "+264", name: "Namibia", iso: "NA" },
  { code: "+674", name: "Nauru", iso: "NR" },
  { code: "+977", name: "Nepal", iso: "NP" },
  { code: "+31", name: "Netherlands", iso: "NL" },
  { code: "+64", name: "New Zealand", iso: "NZ" },
  { code: "+505", name: "Nicaragua", iso: "NI" },
  { code: "+227", name: "Niger", iso: "NE" },
  { code: "+234", name: "Nigeria", iso: "NG" },
  { code: "+47", name: "Norway", iso: "NO" },
  { code: "+968", name: "Oman", iso: "OM" },
  { code: "+92", name: "Pakistan", iso: "PK" },
  { code: "+680", name: "Palau", iso: "PW" },
  { code: "+507", name: "Panama", iso: "PA" },
  { code: "+675", name: "Papua New Guinea", iso: "PG" },
  { code: "+595", name: "Paraguay", iso: "PY" },
  { code: "+51", name: "Peru", iso: "PE" },
  { code: "+63", name: "Philippines", iso: "PH" },
  { code: "+48", name: "Poland", iso: "PL" },
  { code: "+351", name: "Portugal", iso: "PT" },
  { code: "+974", name: "Qatar", iso: "QA" },
  { code: "+40", name: "Romania", iso: "RO" },
  { code: "+7", name: "Russia", iso: "RU" },
  { code: "+250", name: "Rwanda", iso: "RW" },
  { code: "+966", name: "Saudi Arabia", iso: "SA" },
  { code: "+221", name: "Senegal", iso: "SN" },
  { code: "+381", name: "Serbia", iso: "RS" },
  { code: "+248", name: "Seychelles", iso: "SC" },
  { code: "+232", name: "Sierra Leone", iso: "SL" },
  { code: "+65", name: "Singapore", iso: "SG" },
  { code: "+421", name: "Slovakia", iso: "SK" },
  { code: "+386", name: "Slovenia", iso: "SI" },
  { code: "+677", name: "Solomon Islands", iso: "SB" },
  { code: "+252", name: "Somalia", iso: "SO" },
  { code: "+27", name: "South Africa", iso: "ZA" },
  { code: "+82", name: "South Korea", iso: "KR" },
  { code: "+211", name: "South Sudan", iso: "SS" },
  { code: "+34", name: "Spain", iso: "ES" },
  { code: "+94", name: "Sri Lanka", iso: "LK" },
  { code: "+249", name: "Sudan", iso: "SD" },
  { code: "+597", name: "Suriname", iso: "SR" },
  { code: "+268", name: "Eswatini", iso: "SZ" },
  { code: "+46", name: "Sweden", iso: "SE" },
  { code: "+41", name: "Switzerland", iso: "CH" },
  { code: "+963", name: "Syria", iso: "SY" },
  { code: "+886", name: "Taiwan", iso: "TW" },
  { code: "+992", name: "Tajikistan", iso: "TJ" },
  { code: "+255", name: "Tanzania", iso: "TZ" },
  { code: "+66", name: "Thailand", iso: "TH" },
  { code: "+670", name: "Timor-Leste", iso: "TL" },
  { code: "+228", name: "Togo", iso: "TG" },
  { code: "+676", name: "Tonga", iso: "TO" },
  { code: "+216", name: "Tunisia", iso: "TN" },
  { code: "+90", name: "Turkey", iso: "TR" },
  { code: "+993", name: "Turkmenistan", iso: "TM" },
  { code: "+688", name: "Tuvalu", iso: "TV" },
  { code: "+256", name: "Uganda", iso: "UG" },
  { code: "+380", name: "Ukraine", iso: "UA" },
  { code: "+971", name: "United Arab Emirates", iso: "AE" },
  { code: "+44", name: "United Kingdom", iso: "GB" },
  { code: "+1", name: "United States", iso: "US" },
  { code: "+598", name: "Uruguay", iso: "UY" },
  { code: "+998", name: "Uzbekistan", iso: "UZ" },
  { code: "+678", name: "Vanuatu", iso: "VU" },
  { code: "+58", name: "Venezuela", iso: "VE" },
  { code: "+84", name: "Vietnam", iso: "VN" },
  { code: "+967", name: "Yemen", iso: "YE" },
  { code: "+260", name: "Zambia", iso: "ZM" },
  { code: "+263", name: "Zimbabwe", iso: "ZW" },
].sort((a, b) => a.name.localeCompare(b.name));

// Helper function to get country code from ISO code
const getCountryCode = (iso: string): string => {
  const country = countryCodes.find((c) => c.iso === iso);
  return country ? country.code : "+1";
};

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  selectedCountry,
  setSelectedCountry,
  phone,
  setPhone,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries based on search query
  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery) ||
      country.iso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle country selection
  const handleCountrySelect = (iso: string) => {
    setSelectedCountry(iso);
    setIsPopupOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative flex items-center bg-[#0000001F] rounded-[5px] p-2 m-2 w-full">
      <input
        type="tel"
        className="bg-transparent text-right p-2 w-3/5 text-white text-base focus:outline-none"
        placeholder="شماره تلفن"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      />
      <div className="w-[1px] h-6 bg-white mx-2"></div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center w-2/5 text-white text-sm"
      >
        <Image
          src={`https://flagcdn.com/16x12/${selectedCountry.toLowerCase()}.png`}
          alt={`${countryCodes.find((c) => c.iso === selectedCountry)?.name} flag`}
          width={16}
          height={12}
          className="mr-2"
        />
        {getCountryCode(selectedCountry)}
      </button>
      <div className="w-[1px] h-6 bg-white mx-2"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-5 h-5"
      >
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
      </svg>

      {isPopupOpen && (
        <div
          ref={popupRef}
          className="absolute top-full left-0 mt-2 w-full bg-[#333] rounded-lg shadow-lg z-[9999] max-h-[400px] overflow-y-auto"
        >
          <div className="p-2">
            <input
              type="text"
              className="w-full p-2 bg-[#444] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A3B3]"
              placeholder="جستجوی کشور، کد یا ISO"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <ul className="flex flex-col">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={country.iso}
                  className="flex items-center p-2 hover:bg-[#555] cursor-pointer text-white text-sm"
                  onClick={() => handleCountrySelect(country.iso)}
                >
                  <Image
                    src={`https://flagcdn.com/16x12/${country.iso.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                    width={16}
                    height={12}
                    className="mr-2"
                  />
                  <span>{`${country.name} (${country.code})`}</span>
                </li>
              ))
            ) : (
              <li className="p-2 text-white/80 text-sm text-center">کشوری یافت نشد</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Export the helper function for use in parent components
export { getCountryCode };
export default CountryCodeSelector;