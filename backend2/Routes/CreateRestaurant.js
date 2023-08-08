const express = require('express');
const router = express.Router();
const Restaurant = require('../model/restaurant');

//---------------------api for add restaurant---------------------------\\

router.post('/addRestaurant', async (req, res) => {
  try {
    const { owner_id, name, location, dishes } = req.body;

    const restaurant = await Restaurant.create({
      owner_id,
      name,
      location,
      dishes
    });

    res.json({ restaurant_id: restaurant._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//-------------------- api for delete restaturant--------------------//

router.delete('/deleteRestaurant/:restaurantId', async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
  
      // Delete the restaurant and its associated dishes
      await Restaurant.findByIdAndDelete(restaurantId);
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //---------------- api for edit resturant details-------------------\\
  router.put('/editRestaurantDetails/:restaurantId', async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const updatedDetails = req.body;
  
      await Restaurant.findByIdAndUpdate(restaurantId, updatedDetails);
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ----------------------api for  add dish in restaurant-------------------\\
  router.post('/addDish/:restaurantId', async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const dishDetails = req.body;
  
      const restaurant = await Restaurant.findById(restaurantId);
      restaurant.dishes.push(dishDetails);
      await restaurant.save();
  
      res.json({ dish_id: restaurant.dishes[restaurant.dishes.length - 1]._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // ----------------------api for remove dish---------------------------
  router.delete('/removeDish/:restaurantId/:dishId', async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const dishId = req.params.dishId;
  
      const restaurant = await Restaurant.findById(restaurantId);
      restaurant.dishes.id(dishId).remove();
      await restaurant.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //----------api for edit dish-------------------

  router.put('/editDish/:restaurantId/:dishId', async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const dishId = req.params.dishId;
      const updatedVals = req.body;
  
      const restaurant = await Restaurant.findById(restaurantId);
      const dish = restaurant.dishes.id(dishId);
      Object.assign(dish, updatedVals);
      await restaurant.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //------------- api for get all restaurants details-------------\\
  router.get('/getAllRestaurants/:userId?', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      let restaurants = [];
  
      if (userId) {
        // Get restaurants owned by the user
        restaurants = await Restaurant.find({ owner_id: userId });
      } else {
        // Get all restaurants
        restaurants = await Restaurant.find();
      }
  
      res.json({ restaurants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
