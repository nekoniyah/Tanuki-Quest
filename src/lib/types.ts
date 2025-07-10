import type { User } from './server/db/schema';

export interface MyLocals extends App.Locals {
	user: User | null;
}
