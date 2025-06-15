import React from 'react';
import Image from 'next/image';
import { Logo } from '../_assets/icons';
import { Banner } from '../_assets/images';

type Props = {
  name?: string;
  email: string;
  password: string;
  loading: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  buttonText: string;
  alternateText: string;
  alternateLink: string;
  alternateLinkText: string;
  showNameField?: boolean;
};

function FormAuth({
  name = '',
  email,
  password,
  loading,
  error,
  onChange,
  onSubmit,
  title,
  buttonText,
  alternateText,
  alternateLink,
  alternateLinkText,
  showNameField = false,
}: Props) {
  return (
    <div className="flex items-center w-full h-screen justify-between font-poppins">
      <div className="w-1/2 h-full p-16 flex flex-col gap-5">
        <Image src={Logo} alt="Logo" width={120} />
        <h1 className="text-4xl font-bold text-primary">{title}</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          {showNameField && (
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-primary mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="p-2 rounded-md border border-gray-300"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="flex flex-col mt-4">
            <label className="text-lg font-semibold text-primary mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="p-2 rounded-md border border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-lg font-semibold text-primary mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="p-2 rounded-md border border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300 disabled:bg-opacity-50"
          >
            {loading ? `${buttonText}...` : buttonText}
          </button>

          <p className="mt-4 text-gray-600">
            {alternateText}{' '}
            <a href={alternateLink} className="text-primary font-semibold">{alternateLinkText}</a>
          </p>
        </form>
      </div>

      <div className="w-1/2 h-screen">
        <Image src={Banner} alt="Auth Banner" className='w-full h-full object-cover' />
      </div>
    </div>
  );
}

export default FormAuth;