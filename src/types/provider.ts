
export interface Provider {
  id: string;
  // Basic Information
  name: string;
  specialty: string;
  npiNumber: string;
  licenseNumber: string;
  
  // Facility Information
  facilityName: string;
  department?: string;
  physicalAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  mailingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Contact Details
  phoneMain: string;
  phoneRecords?: string;
  faxNumber?: string;
  email?: string;
  recordsContactPerson?: string;
  
  // Treatment Information
  firstTreatmentDate: string;
  lastTreatmentDate: string;
  treatmentType: string;
  estimatedVisits: number;
  outstandingBills?: number;
  
  // System fields
  isVerified: boolean;
  credentialIssues?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NPIValidationResult {
  isValid: boolean;
  provider?: {
    name: string;
    specialty: string;
    licenseStatus: 'active' | 'inactive' | 'suspended';
    address: string;
  };
  errors?: string[];
}

export const MEDICAL_SPECIALTIES = [
  'Allergy and Immunology',
  'Anesthesiology',
  'Cardiology',
  'Cardiovascular Surgery',
  'Dermatology',
  'Emergency Medicine',
  'Endocrinology',
  'Family Medicine',
  'Gastroenterology',
  'General Surgery',
  'Geriatrics',
  'Hematology',
  'Infectious Disease',
  'Internal Medicine',
  'Nephrology',
  'Neurology',
  'Neurosurgery',
  'Obstetrics and Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedic Surgery',
  'Otolaryngology',
  'Pathology',
  'Pediatrics',
  'Physical Medicine and Rehabilitation',
  'Plastic Surgery',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Rheumatology',
  'Urology'
];
