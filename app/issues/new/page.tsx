'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const page = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();
  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={handleSubmit(async (data) => {
        await fetch('/api/issues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        router.push('/issues');
      })}
    >
      <TextField.Root
        placeholder="Title"
        {...register('title')}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      ></Controller>
      <Button>Submit new issue</Button>
    </form>
  );
};

export default page;
