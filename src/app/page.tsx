import { redirect } from 'next/navigation';
import { defaultLocale } from '@/types/database';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
