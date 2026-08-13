import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import '../globals.css';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin — Team Zealancy',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="adm-root">
      <AdminSidebar />
      <div className="adm-main">
        {children}
      </div>
    </div>
  );
}
