import { APP_NAME } from '@fitapp/contracts'
import { McpServer } from '@modelcontextprotocol/server'

import { logMealInputSchema } from './log-meal-input-schema.ts'
import { logMeal } from './log-meal.ts'

import type { FitAppConfig } from './read-fitapp-config.ts'

export function createServer(config: FitAppConfig): McpServer {
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
