import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const walletRouter = router({
  getAll: publicProcedure.query(async () => {
    // TODO: Implement actual database query
    return [
      { id: '1', userId: '1', balance: 1000, isActive: true },
      { id: '2', userId: '2', balance: 2000, isActive: false },
    ];
  }),

  toggleFreeze: publicProcedure
    .input(z.object({ walletId: z.string(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      // TODO: Implement actual database update
      return { success: true, walletId: input.walletId, isActive: input.isActive };
    }),
});