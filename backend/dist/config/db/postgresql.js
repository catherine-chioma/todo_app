import { Client } from 'pg';
const client = new Client({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost', // Host (PostgreSQL running locally)
    database: 'template1', // Database name (e.g., 'todo-app')
    password: 'newpassword', // Password for the database
    port: 4190, // Default PostgreSQL port
});
// Connect to PostgreSQL database
client.connect()
    .then(() => {
    console.log('PostgreSQL connected successfully');
})
    .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err.message);
});
// Gracefully handle shutdown to close the connection
process.on('SIGINT', () => {
    console.log('Closing PostgreSQL connection...');
    client.end(() => {
        console.log('PostgreSQL connection closed');
        process.exit(0);
    });
});
export default client; // Make sure to export the client
