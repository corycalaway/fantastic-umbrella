const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll (
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
      
    }
  )
  .then(categoryInfo => 
    res.json(categoryInfo))

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      
        include: [{
          model: Product,
          attributes: ['product_name']
        },
        {
          model: Product,
          attributes: ['category_id']
        }]
    }
  )
  .then(categoryInfo => 
    res.json(categoryInfo))

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  console.log(req.body)
  Category.create({
    
    category_name: req.body.category_name
  })

  .then(categoryInfo =>
    res.json(categoryInfo))

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

});



router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log(req.body)
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(categoryInfo => {
      res.json(categoryInfo);
    })


    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryInfo => {
      res.json(categoryInfo);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
