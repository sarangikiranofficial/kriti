export type AvailabilityStatus = 'available' | 'reserved' | 'sold' | 'archived';
export type EnquiryType = 'Buy' | 'Commission' | 'Collaboration' | 'Workshop';
export type EnquiryStatus = 'unread' | 'read' | 'replied';

export interface Artist {
  id: string; // References auth.users(id)
  slug: string;
  name: string;
  name_regional: string | null;
  art_form: string;
  location_state: string;
  location_district: string | null;
  bio: string;
  languages_spoken: string[];
  portrait_url: string | null;
  whatsapp_number: string | null;
  phone: string | null;
  instagram: string | null;
  created_at: string;
  updated_at: string;
}

export interface Artwork {
  id: string;
  artist_id: string;
  title: string;
  title_regional: string | null;
  image_url: string;
  image_alt: string;
  medium: string;
  year: string | null;
  dimensions: string | null;
  price: number | null;
  is_price_on_request: boolean;
  availability: AvailabilityStatus;
  cultural_context: string;
  ownership_declared: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  artist_id: string;
  artwork_id: string | null;
  sender_name: string;
  sender_contact: string;
  enquiry_type: EnquiryType;
  budget: string | null;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}
