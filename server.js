import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';


const __filename = fileURLToPath(import.meta.url); // or process.resolve()
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(__dirname));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'ion-3d-engine.html'));
});

app.get('/gui-examples/gui-sample.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'gui-examples', 'gui-sample.html'));
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
