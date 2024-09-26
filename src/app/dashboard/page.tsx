import { WidgetItem } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <WidgetItem title="Usuario conectado S-Side">
        <span className="break-words">{ session.user?.name }</span>
        <span className="break-words">{ session.user?.email }</span>
        <span className="break-words">{ session.user?.image }</span>
        <span className="break-words">{ JSON.stringify(session) }</span>
      </WidgetItem>
    </div>
  );
}