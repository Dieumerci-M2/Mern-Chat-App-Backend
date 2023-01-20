
/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch : ['**/**/*.test.js'],
    verbose : true,
    forceExit: true, 

}; 


export default config;
