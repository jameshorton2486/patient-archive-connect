export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: DocumentType;
  content: string;
  variables: string[];
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
  status: 'generated' | 'pending-signature' | 'completed' | 'archived';
  signatureRequired: boolean;
  signedBy?: string;
  signedDate?: string;
  createdAt: string;
  expiresAt?: string;
}

export type DocumentType = 
  'records-request' | 
  'hipaa-authorization' | 
  'affidavit-notarization';

export interface QRCodeData {
  trackingId: string;
  clientId: string;
  providerId?: string;
  documentType: DocumentType;
  generatedDate: string;
  caseId?: string;
}

export interface FirmBranding {
  firmName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  fax?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  letterheadImageUrl?: string;
}

// Add the missing DOCUMENT_TEMPLATES export
export const DOCUMENT_TEMPLATES: Record<DocumentType, string> = {
  'records-request': `
MEDICAL RECORDS REQUEST

Date: {{date}}
From: {{firmName}}
To: {{providerName}}

{{firmLetterhead}}

Dear Medical Records Department,

We represent {{clientName}} (DOB: {{clientDOB}}) in connection with injuries sustained on {{incidentDate}}.

We hereby request copies of all medical records for the above-named patient for treatment received from {{startDate}} to {{endDate}}.

This request includes but is not limited to:
- Office visit notes
- Emergency department records
- Laboratory results
- Radiology reports and images
- Physical therapy notes
- Billing statements

Please provide these records within {{responseTimeFrame}} days as required by law.

Tracking ID: {{trackingId}}

Sincerely,
{{attorneyName}}
  `,
  'hipaa-authorization': `
AUTHORIZATION FOR RELEASE OF MEDICAL INFORMATION

Patient Name: {{clientName}}
Date of Birth: {{clientDOB}}
Address: {{clientAddress}}

I authorize {{providerName}} to release my medical records to:
{{firmName}}
{{firmAddress}}

Date Range: {{startDate}} to {{endDate}}
Reason: Legal representation related to incident on {{incidentDate}}

This authorization expires on: {{expirationDate}}

Patient Signature: _________________ Date: ________

Tracking ID: {{trackingId}}
  `,
  'affidavit-notarization': `
AFFIDAVIT OF RECORDS CUSTODIAN

State of {{state}}
County of {{county}}

I, the undersigned, being first duly sworn, depose and state:

1. I am the custodian of records for {{providerName}}
2. The attached records are true and accurate copies
3. These records were made in the regular course of business
4. It is the regular practice to make such records

_________________
Records Custodian

Subscribed and sworn before me this _____ day of _______, 20__

_________________
Notary Public

Tracking ID: {{trackingId}}
  `
};
