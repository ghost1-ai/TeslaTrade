import { type User, type Portfolio, type Transaction, type Notification } from "@shared/schema";

// Firebase-based storage interface for Tesla Investment Platform
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: User): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<void>;
  
  getPortfolio(userId: string): Promise<Portfolio | undefined>;
  updatePortfolio(userId: string, data: Partial<Portfolio>): Promise<void>;
  
  getUserTransactions(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: Transaction): Promise<Transaction>;
  
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: Notification): Promise<Notification>;
}

// Note: Actual storage is handled by Firebase in the client-side auth context
// This interface is kept for API consistency but not actively used
export class FirebaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    throw new Error("Firebase operations are handled client-side");
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error("Firebase operations are handled client-side");
  }

  async createUser(user: User): Promise<User> {
    throw new Error("Firebase operations are handled client-side");
  }

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    throw new Error("Firebase operations are handled client-side");
  }

  async getPortfolio(userId: string): Promise<Portfolio | undefined> {
    throw new Error("Firebase operations are handled client-side");
  }

  async updatePortfolio(userId: string, data: Partial<Portfolio>): Promise<void> {
    throw new Error("Firebase operations are handled client-side");
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    throw new Error("Firebase operations are handled client-side");
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    throw new Error("Firebase operations are handled client-side");
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    throw new Error("Firebase operations are handled client-side");
  }

  async createNotification(notification: Notification): Promise<Notification> {
    throw new Error("Firebase operations are handled client-side");
  }
}

export const storage = new FirebaseStorage();
