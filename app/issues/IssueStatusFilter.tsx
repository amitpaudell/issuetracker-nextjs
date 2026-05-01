'use client';

import { Status } from '@/generated/prisma/enums';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const statues: { label: string; value: Status | null }[] = [
  { label: 'All', value: null },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === 'ALL' ? '' : `?status=${status}`;
        router.push('/issues' + query);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        {statues.map((status) => (
          <Select.Item key={status.label} value={status.value ?? 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
