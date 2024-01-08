const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Finds all the categories and includes its associated Products 
  Category.findAll( {
    include: [Product]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

// Finds one category by its 'id' value and includes its associated Products 
router.get('/:id', (req, res) => {
  Category.findOne(
    {
      // Gets the category based on the id given in the request parameters
      where: { 
        id: req.params.id 
      },
      include: [Product]
    }
  ).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', async (req, res) => {
  // Creates a new category 
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    // Looks for the category based on id given in the request parameters and deletes the instance from the database
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedCategory) => {
        res.json(deletedCategory);
      })
      .catch((err) => res.json(err));
  
});

module.exports = router;
