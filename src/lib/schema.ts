import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
	isDone: z.boolean(),
	label: z.string(),
	priority: z.string(),
	messages: z.array(z.string()),
	responsible: z.object({ name: z.string(), avatar: z.string() }),
})

export type Task = z.infer<typeof taskSchema>
