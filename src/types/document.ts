
export interface DocumentTemplate {
  id: string;
  type: DocumentType;
  name: string;
  description: string;
  template: string;
  requiredFields: string[];
  stateSpecific?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  type: DocumentType;
  clientId: string;
  providerId?: string;
  content: string;
  qrCode: string;
  trackingId: string;
  status: DocumentStatus;
  signatureRequired: boolean;
  signedAt?: string;
  createdAt: string;
  expiresAt?: string;
}

export type DocumentType = 
  | 'hipaa-authorization'
  | 'affidavit-notarization'
  | 'records-request'
  | 'follow-up-reminder'
  | 'formal-follow-up'
  | 'fee-payment'
  | 'final-demand';

export type DocumentStatus = 
  | 'draft'
  | 'generated'
  | 'sent'
  | 'signed'
  | 'expired'
  | 'cancelled';

export interface FirmBranding {
  firmName: string;
  logo?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  fax?: string;
  email: string;
  website?: string;
  primaryColor: string;
  secondaryColor: string;
  letterheadTemplate: string;
}

export interface QRCodeData {
  trackingId: string;
  clientId: string;
  providerId?: string;
  documentType: DocumentType;
  generatedDate: string;
  caseId: string;
}

export const DOCUMENT_TEMPLATES: Record<DocumentType, string> = {
  'hipaa-authorization': `
HIPAA AUTHORIZATION FOR RELEASE OF MEDICAL INFORMATION

Patient Name: {{clientName}}
Date of Birth: {{clientDOB}}
Patient Address: {{clientAddress}}

To: {{providerName}}
{{providerAddress}}

I, {{clientName}}, hereby authorize {{firmName}} to obtain copies of my medical records from {{providerName}} for the period from {{startDate}} to {{endDate}}.

This authorization includes:
• All medical records, reports, and documentation
• X-rays, MRIs, CT scans, and other imaging
• Laboratory and pathology reports
• Treatment notes and discharge summaries

This authorization expires on {{expirationDate}}.

Patient Signature: ______________________ Date: __________

Tracking ID: {{trackingId}}
`,
  'affidavit-notarization': `
AFFIDAVIT OF {{clientName}}

State of {{state}}
County of {{county}}

I, {{clientName}}, being duly sworn, depose and say:

1. I am over the age of 18 and competent to make this affidavit.
2. On {{incidentDate}}, I sustained injuries in {{incidentType}}.
3. As a result of said incident, I have incurred medical expenses and suffered pain and suffering.
4. The facts stated herein are true and correct to the best of my knowledge.

{{clientName}}

Sworn to before me this _____ day of _______, 2025.

_____________________
Notary Public

Tracking ID: {{trackingId}}
`,
  'records-request': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Request for Medical Records
Patient: {{clientName}}
Date of Birth: {{clientDOB}}
Date of Loss: {{incidentDate}}

Dear Medical Records Administrator:

We represent {{clientName}} in connection with injuries sustained on {{incidentDate}}. Please provide us with copies of all medical records for the above-named patient from {{startDate}} to {{endDate}}.

An executed HIPAA authorization is enclosed. Please forward the records to our office at your earliest convenience.

If you have any questions, please contact our office at {{firmPhone}}.

Sincerely,

{{attorneyName}}
{{firmName}}

Tracking ID: {{trackingId}}
`,
  'follow-up-reminder': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Courtesy Reminder - Medical Records Request
Patient: {{clientName}}
Our Previous Request: {{originalRequestDate}}

Dear Records Department:

This is a courtesy reminder regarding our medical records request dated {{originalRequestDate}} for {{clientName}}.

We have not yet received the requested records. Please forward them at your earliest convenience to avoid any delays in our client's case.

Thank you for your prompt attention to this matter.

Sincerely,

{{firmName}}

Original Tracking ID: {{trackingId}}
`,
  'formal-follow-up': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: FORMAL FOLLOW-UP - Medical Records Request
Patient: {{clientName}}
Original Request Date: {{originalRequestDate}}

Dear Medical Records Administrator:

We previously requested medical records for {{clientName}} on {{originalRequestDate}}. Despite our courtesy reminder, we have not received the requested documentation.

Please be advised that {{state}} law requires healthcare providers to respond to medical records requests within {{responseTimeFrame}} days. We respectfully request immediate compliance with our original request.

Failure to respond may result in formal legal action to compel production of these records.

We appreciate your immediate attention to this matter.

Sincerely,

{{attorneyName}}
{{firmName}}

Original Tracking ID: {{trackingId}}
`,
  'fee-payment': `
{{firmLetterhead}}

{{date}}

{{providerName}}
Medical Records Department
{{providerAddress}}

Re: Payment for Medical Records
Patient: {{clientName}}
Invoice Amount: ${{feeAmount}}

Dear Billing Department:

Please find enclosed payment in the amount of ${{feeAmount}} for medical records requested for {{clientName}}.

Please process our records request upon receipt of this payment and forward the documentation to our office.

If you have any questions regarding this payment, please contact our office immediately.

Thank you,

{{firmName}}

Payment Reference: {{trackingId}}
`,
  'final-demand': `
{{firmLetterhead}}

{{date}}

{{providerName}}
ATTN: Medical Records Department
{{providerAddress}}

Re: FINAL DEMAND - Medical Records Request
Patient: {{clientName}}
Original Request Date: {{originalRequestDate}}

Dear Provider:

This constitutes our FINAL DEMAND for medical records for {{clientName}} originally requested on {{originalRequestDate}}.

You have failed to respond to our previous requests dated {{originalRequestDate}} and {{followUpDate}}. This failure to comply with lawful requests may constitute a violation of {{state}} medical records laws.

You have FIVE (5) BUSINESS DAYS from receipt of this letter to provide the requested records. Failure to comply will result in formal legal proceedings against your facility.

We trust you will give this matter your immediate attention.

Very truly yours,

{{attorneyName}}
{{firmName}}

FINAL DEMAND - Tracking ID: {{trackingId}}
`
};
