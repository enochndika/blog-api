import * as http from 'http';
import app from '../app';

/**
 * Get port from environment and store in Express.
 */

const port = 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

server.listen(port);
