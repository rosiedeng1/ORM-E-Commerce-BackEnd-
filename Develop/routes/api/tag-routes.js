const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // finds all tags and includes its associated Product data
  Tag.findAll( {
    include: [{ model: Product, through: ProductTag}]
  }).then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
    // finds a single tag by its `id` and includes its associated Product data
  Tag.findOne(
    {
      include: [{ model: Product, through: ProductTag}],
      // Gets one tag based on the id given in the request parameters
      where: { 
        id: req.params.id
      },
    }
  ).then((tagData) => {
    res.json(tagData);
  });
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
       // updates a tag's name by its `id` value
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
      id: req.body.id,
    },
    {
      // Gets the tag based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated tag as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    // deletes on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));

});

module.exports = router;
