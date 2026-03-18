import pkg from 'pg';
const { Client } = pkg;

async function testConn() {
    const connectionString = "postgres://postgres:postgres@localhost:51214/postgres";
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        console.log('Connected to postgres database successfully');
        await client.end();
    } catch (err: any) {
        console.error('Connection failed to postgres:', err);
        
        // Try template1
        const client2 = new Client({
            connectionString: "postgres://postgres:postgres@localhost:51214/template1",
        });
        try {
            await client2.connect();
            console.log('Connected to template1 database successfully');
            await client2.end();
        } catch (err2: any) {
            console.error('Connection failed to template1:', err2);
        }
    }
}

testConn();
