'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import {
  useForm
} from 'react-hook-form';
import { signIn } from 'next-auth/react';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from './../Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm({
    defaultValues: {
      fname: '',
      mname: '',
      lname: '',
      gender: '',
      email: '',
      password: '',
      PhoneNum: '',
      Address: ''
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome to Pa-Healot'
        subtitle='Create an account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='fname'
        label='First name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='mname'
        label='Middle name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='lname'
        label='Last name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='PhoneNum'
        label='Phone Number'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='Address'
        label='Current Address'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-1 mt-3'>
      <hr />
      <Button 
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <div
        className='
          text-neutral-500
          text-center
          mt-4
          font-light
        '
      >
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div
            onClick={toggle}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
            '
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    
      <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    
  )
}

export default RegisterModal;