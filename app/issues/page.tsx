import React from 'react';
import { Button, Link } from '@radix-ui/themes';
const page = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issues</Link>
      </Button>
    </div>
  );
};

export default page;
