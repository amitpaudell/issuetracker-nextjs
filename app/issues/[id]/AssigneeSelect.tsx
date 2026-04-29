'use client';

import { Issue, User } from '@/generated/prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/app/components';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const UNASSIGNED = 'unassigned';
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
      fetch('/api/users').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      }),
    staleTime: 60 * 1000, //60s
  });
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  if (error) {
    return null;
  }
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || UNASSIGNED}
      onValueChange={(userId) => {
        fetch('/api/issues/' + issue.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assignedToUserId: userId === UNASSIGNED ? null : userId,
          }),
        });
      }}
    >
      <Select.Trigger placeholder="assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={UNASSIGNED}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
