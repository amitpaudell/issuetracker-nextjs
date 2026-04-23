import { Flex, Card, Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const LoadingDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>
      <Flex my="2" gapX="9">
        <Skeleton width="5rem"></Skeleton>
        <Skeleton width="8rem"></Skeleton>
      </Flex>

      <Card className="prose prose-slate max-w-none" mt="4">
        <Skeleton count={3}></Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingDetailPage;
