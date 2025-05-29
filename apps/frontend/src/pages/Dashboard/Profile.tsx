import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import loadingGif from '@/assets/loading.gif';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No user token found');
        setLoading(false);
        return;
      }

      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const userId = payload.id;

        const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const userData: User = await res.json();
        setUser(userData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('Error fetching user data');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );

  if (!user) return null;

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#f9fdf3] pt-12 px-4">
      <Card className="max-w-sm w-full p-8 rounded-3xl border border-[#a7da01] shadow-md flex flex-col items-center bg-white">
        <div
          className="w-24 h-24 rounded-full bg-[#a7da01] flex items-center justify-center text-white text-4xl font-bold mb-6 select-none"
          aria-label="User avatar"
        >
          {user.name[0]}
        </div>

        <div className="text-center space-y-3 text-[#161616] w-full">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-[#05b305] font-medium">{user.email}</p>
          <p className="bg-opacity-20 rounded-lg py-2 font-semibold">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Card>
    </div>
  );
}