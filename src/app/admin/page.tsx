import { Metadata } from 'next';
import AdminWrapper from '@/components/AdminWrapper';
import AdminRouteProtection from '@/components/AdminRouteProtection';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: `Admin - ${seoConfig.siteName} Management`,
  description: `Manage content for ${seoConfig.siteName} validator website`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <AdminRouteProtection>
      <AdminWrapper />
    </AdminRouteProtection>
  );
}
