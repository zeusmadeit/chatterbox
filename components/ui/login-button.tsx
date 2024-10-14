'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import { Button, ButtonProps } from '@/components/ui/button';

export const LoginButton = ({
  disabled,
  color = 'white',
  onClick,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Button
      onClick={e => {
        e.preventDefault();

        if (user) {
          router.push('/chat');
        } else {
            router.push('/auth');
        }
      }}
      color={color}
      disabled={disabled}
      {...props}
    ></Button>
  );
};
