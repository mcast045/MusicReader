const router = require('express').Router()
const songController = require('../controller/songsController')

router.get('/:id/:songId', songController.getUserSong)
router.get('/:songId', songController.getPublishedSong)
router.get('/', songController.getPublishedSongs)

router.post('/', songController.postSong)
router.put('/publish/:songId', songController.publishSong)
router.put('/redact/:songId', songController.redactSong)
router.delete('/:songId', songController.deleteSong)

module.exports = router