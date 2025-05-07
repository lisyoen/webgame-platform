module.exports = {
    apps: [
        {
            name: 'server',
            script: 'src/app.ts',
            interpreter: 'ts-node',
            watch: false,
        },
        {
            name: 'client',
            cwd: './client',
            script: 'npm',
            args: 'run dev',
            watch: false,
        },
    ],
};
