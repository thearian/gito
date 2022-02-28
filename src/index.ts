#!/usr/bin/env node
import yargs from 'yargs'
import * as chalk from 'chalk'
import useConfig from './hooks/useConfig'
import useWatch from './hooks/useWatch'

(async () => {
    yargs(process.argv.slice(2))
        .command('init', 'Initializes a gito setting', yargs => {
            yargs.option('yes', {
                alias: 'y',
                description: 'Autocompletes the config',
                type: 'boolean',
                default: false,
            })
            yargs.option('check', {
                alias: 'c',
                description: 'Just checks if config is set, would not make one',
                type: 'boolean',
                default: false,
            })
        }, async argv => {
            try {
                const config = await useConfig({
                    autoComplete: !!argv.yes,
                    justCheck: !!argv.check
                })
                
                console.log(`
                    ${chalk.bgGreen(chalk.black('GITO INIT'))} ${chalk.green('completed successfully')}
                    ${config}
                `);
            }
            catch (error) {
                console.log(`
                    ${chalk.bgRed(chalk.black('ERROR'))} ${chalk.redBright(error)}
                `);
            }
        })
        .command('start', 'Strats watching files and generating history', yargs => {
        }, async argv => {
            const files = (argv._ as string[]) || "."
            console.log(`
                ${chalk.cyan(chalk.black('RUNNING'))} ${chalk.cyan('Watching', files )}
            `);
            
            await new Promise((_, reject) => {
                const watcher = useWatch(files)
                watcher.on('error', reject)
            })
        })
        .argv
})()