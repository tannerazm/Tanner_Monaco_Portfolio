const router = require('express').Router()

// GET /api/health
router.get('/health', async (req, res) => {
  const data = {
    message: 'I am healthy!',
  };
  res.status(200).send(data);
});

router.get('/unknown', async (req, res) => {
  res.status(404).send({
    message: 'This webpage is not found.',
  });
});

module.exports = router;