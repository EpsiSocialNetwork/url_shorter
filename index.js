require('dotenv').config()
const express  = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const yup = require('yup')
const rateLimit = require('express-rate-limit')
const slowDown = require('express-slow-down')
const nanoid = require('nanoid').customAlphabet('1234567890aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ', 7)
const redis = require("redis");


const client = redis.createClient();
client.on('connect', function() {
    console.log('connected');
});

const app = express()
app.enable('trust proxy')
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

const notFoundPath = path.join(__dirname, 'public/404.html')

const schema = yup.object().shape({
  slug: yup.string().trim().matches(/^[\w\-]+$/i),
  url: yup.string().trim().url().required(),
})

// Redirect short url by id
app.get('/:id', async (req, res, next) => {
  const { id: slug } = req.params
  try
    await client.exists(slug) ? res.redirect(302, url.url) : res.status(404).sendFile(notFoundPath)
  catch (error)
    return res.status(404).sendFile(notFoundPath)
})

// Get a short url by id
app.get('/url/:id', (req, res) => {
	// add view counter
	res.json(/* GET VALUE FROM REDIS */)
})

// --- Post new url ---
app.post('/url', slowDown({ windowMs: 30 * 1000, delayAfter: 1, delayMs: 500, }), rateLimit({ windowMs: 30 * 1000, max: 1, }), async (req, res, next) => {
  let { slug, url } = req.body
  try {
    await schema.validate({ slug, url, })
    //url.includes('cdg.sh') ? throw new Error('Stop it. 🛑') : undefined
	slug ? await client.exists(slug) ? throw new Error('Slug in use. 🍔') : undefined : slug=nanoid()
	// --- TODO Inert in redis ---
    client.set(slug, url, redis.print)
    client.expire(slug, 2600000) // One Month

    res.json(created)
    // --- === ---
  } catch (error) {
    next(error)
  }
})


// --- Error Managment ---
app.use((req, res, next) => res.status(404).sendFile(notFoundPath))
app.use((error, req, res, next) => {
	error.status ? res.status(error.status) : res.status(418)
	res.json({ 
		message: error.message, 
		stack : process.env.NODE_ENV ==='production' ? '🥞 ' : error.stack
	})
})

// --- Run ---
const port = process.env.PORT || 1300 
app.listen(port, () => console.log(`Listening at http://localhost: ${port}`)) 