import { serveStdio } from '@modelcontextprotocol/server/stdio'

import { createServer } from './create-server.ts'
import { readElanceConfig } from './read-elance-config.ts'

const config = readElanceConfig()
void serveStdio(() => createServer(config))
