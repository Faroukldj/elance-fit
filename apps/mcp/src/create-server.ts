import { APP_NAME } from '@elance/contracts'
import { McpServer } from '@modelcontextprotocol/server'

import { logMealInputSchema } from './log-meal-input-schema.ts'
import { logMeal } from './log-meal.ts'

import type { ElanceConfig } from './read-elance-config.ts'

export function createServer(config: ElanceConfig): McpServer {
	const server = new McpServer({
		name: 'elance',
		version: '0.0.1',
	})
	server.registerTool(
		'log_meal',
		{
			title: 'Enregistrer un repas',
			description: `Enregistre un ou plusieurs repas dans ${APP_NAME}.`,
			inputSchema: logMealInputSchema,
		},
		async input => logMeal(config, input),
	)
	return server
}
