import { z } from "zod";

// User schema for Firebase
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  country: z.string(),
  currency: z.string(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']).default('bronze'),
  isVerified: z.boolean().default(false),
  depositAddress: z.string(),
  authCode: z.string(),
  documentType: z.string().optional(),
  frontDocumentURL: z.string().optional(),
  backDocumentURL: z.string().optional(),
  createdAt: z.number(),
});

// Portfolio schema
export const portfolioSchema = z.object({
  userId: z.string(),
  invested: z.number().default(0),
  profit: z.number().default(0),
  bonus: z.number().default(0),
  balance: z.number().default(0),
  btcEquivalent: z.number().default(0),
  updatedAt: z.number(),
});

// Transaction schema
export const transactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['deposit', 'withdrawal', 'trade', 'bonus']),
  amount: z.number(),
  status: z.enum(['pending', 'completed', 'failed']),
  description: z.string(),
  timestamp: z.number(),
});

// Notification schema
export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  message: z.string(),
  read: z.boolean().default(false),
  timestamp: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type Notification = z.infer<typeof notificationSchema>;

export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
