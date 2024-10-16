'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

import { Button, ButtonProps } from '@/components/ui/button';

export const LoginButton = ({
  disabled,
  color = 'white',
  // onClick,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <Button
      onClick={e => {
        e.preventDefault();

        if (user) {
          router.push('/rooms');
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
