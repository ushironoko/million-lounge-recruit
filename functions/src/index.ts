'use strict'

import * as functions from 'firebase-functions'
import * as cors from 'cors'
import * as express from 'express'
// import * as Axios from 'axios'

const app = express()
// const axios = Axios.default.create({
//     headers: {'Content-Type': 'application/json;charset=utf-8'}
// })

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET"
  };

app.use(cors(options))

app.get('/v1/hoge', async (req, res) => {
    try {
        res.status(200).send('hoge!')

    } catch(error) {
        console.log(error)
        res.status(400).send(`Error:${error}`)
    }
})

const api = functions.region('asia-northeast1').https.onRequest(app)
export default api
