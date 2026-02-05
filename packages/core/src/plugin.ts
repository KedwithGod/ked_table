import { Plugin } from './types'

/**
 * Creates a plugin with default values
 */
export function createPlugin(config: Plugin): Plugin {
    return {
        name: config.name,
        hooks: config.hooks || {},
        state: config.state || {},
        methods: config.methods || {},
    }
}
