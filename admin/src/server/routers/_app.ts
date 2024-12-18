import { router } from '../trpc';
import { userRouter } from './user';
import { walletRouter } from './wallet';

export const appRouter = router({
  user: userRouter,
  wallet: walletRouter,
});

export type AppRouter = typeof appRouter;