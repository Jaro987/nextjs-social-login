'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '../lib/actions';
import GoogleSignIn from '@/components/google/sign-in';
import FacebookSignIn from '@/components/facebook/sign-in';
import { Separator } from '@/components/ui/separator';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <>
      <form action={formAction} className="space-y-3 text-white">
        <div className="flex-1 rounded-lg bg-black/50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-white/50 bg-transparent focus:border-gray-900 focus:border-gray-300 focus:outline-0 focus:ring-0"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-white/50 bg-transparent focus:border-gray-300 focus:outline-0 focus:ring-0"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full" aria-disabled={isPending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
      <div className='flex justify-center flex-row items-center'>

        <Separator className='w-[40%] mx-4' />
        <span className="text-white">or</span>
        <Separator className='w-[40%] mx-4' />
      </div>
      <div className="flex flex-col rounded-lg bg-black/50 px-6 pb-4 pt-8 gap-4">

        <GoogleSignIn />
        <FacebookSignIn />

      </div>
    </>
  );
}
