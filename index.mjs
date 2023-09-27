
import express from 'express'
import bodyParser from 'body-parser'
import { getJson } from './openia.mjs'
import { analyzeImage } from './vision-gcp.mjs'
import { mintGoerli } from './CCIP.mjs'
import { newJob } from './rass.mjs'
import { saveEncrypt, getFileEncryptionKey, saveTextEncrypt, createControlAcces } from './lighthouse.mjs'
import cors from 'cors';


const app = express()
const port = 3000

app.use(cors());
app.use(express.json({ limit: '50mb' }));

var jsonParser = bodyParser.json()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/uploadImage', jsonParser, async (req, res) => {
  let { img, signedMessage, publicKey } = req.body
  img = img.replace('data:image/png;base64,', '')
  img = img.replace('data:image/jpeg;base64,', '')


  const texto = await analyzeImage(img);
  console.log(texto)
  const json = await getJson(texto);

  const cidCifrado = await saveTextEncrypt(json, signedMessage, publicKey);

  const content = JSON.parse(json);

  console.log(cidCifrado);

  content['cid'] = cidCifrado

  const parms = {
    cid: cidCifrado
  }

  await newJob(parms)

  console.log(content);

  res.send(content).json();
})

app.post('/access', async (req, res) => {
  let { cid, wallet, publicKey, signedMessage } = req.body

  await createControlAcces(cid, signedMessage, publicKey);
  const txHash = await mintGoerli(wallet);

  res.send({ hash: txHash }).json();
})

app.post('/encript', async (req, res) => {
  const cid = await saveEncrypt('holaaaaa');
  getFileEncryptionKey(cid);

})

app.post('/cross', async (req, res) => {
  let { wallet } = req.body

  const txHash = await mintGoerli(wallet);

  res.send({ hash: txHash }).json();
});


app.post('/register_job', async (req, res) => {

  await newJob(req.body)

  return res.status(201).json({
    message: "Job registered successfully."
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
