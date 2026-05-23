export type Language = 'id' | 'en' | 'zh';

export type ActiveView =
  | 'home'
  | 'about'
  | 'origin-farm'
  | 'products'
  | 'export'
  | 'shop'
  | 'gallery'
  | 'articles'
  | 'contact';

export interface Product {
  id: string;
  nameKey: string; // Key in translations
  category: 'green' | 'roasted' | 'ground';
  roastKey?: string; // e.g., 'Medium-Dark Roast'
  processKey: string; // e.g., 'Full Washed', 'Natural'
  elevationKey: string; // e.g., '800-1200m'
  moistureKey?: string; // For green beans
  price: number; // In IDR or USD equivalent represented symmetrically
  image: string;
  notesKey: string; // Taste notes e.g., 'Chocolaty, Spiced, Full-Bodied'
  packagingKey: string; // Packaging e.g., '60kg jute bags' or '250g premium pouch'
}

export interface CartItem {
  product: Product;
  quantity: number;
  grindSize?: string; // For coffee bean products
}

export interface GalleryItem {
  id: string;
  category: 'farm' | 'harvest' | 'processing' | 'roasting' | 'packaging' | 'experience';
  titleKey: string;
  descriptionKey: string;
  image: string;
}

export interface Article {
  id: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  categoryKey: string;
  date: string;
  readTimeKey: string;
  image: string;
}

export interface InquiryFormState {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  productInterest: string;
  volumeRequirement: string;
  message: string;
}
