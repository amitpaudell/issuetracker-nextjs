'use client';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await fetch('/api/issues', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              setError('An unexpected error has occured ');
              return;
            }
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error has occured');
            console.log(error);
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register('title')}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        ></Controller>
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default page;
