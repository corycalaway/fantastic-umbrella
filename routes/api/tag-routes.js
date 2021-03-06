const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  Tag.findAll(
    {
      include: 
        {
          model: Product,
          
        }
       
    }
  )
  .then(tagInfo => {
    if (!tagInfo) {
      res.status(404).json({ message: 'Tag info not found!' });
      return;
    }

    res.json(tagInfo)
  })

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
    }
  })
    .then(tagInfo => {
      if (!tagInfo) {
        res.status(404).json({ message: 'Tag info not found!' });
        return;
      }

      res.json(tagInfo)
    })
      
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  console.log(req.body)
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagInfo => 
      
      res.json(tagInfo))

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  console.log(req.body)

  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagInfo => {
      if (!tagInfo) {
        res.status(404).json({ message: 'Tag ID not found!' });
        return;
      }
      res.json(tagInfo);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  console.log(req.body)
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagInfo => {
      if (!tagInfo) {
        res.status(404).json({ message: 'Tag info not found!' });
        return;
      }
      res.json(tagInfo);
    })

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
