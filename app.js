// Storage Controller


// Item Controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 600},
            {id: 0, name: 'Oats', calories: 400},
            {id: 0, name: 'Cake', calories: 1400}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public Method
    return {
        logData: function() {
            return data;
        }
    }
})();


// UI Controller
const UICtrl = (function() {

})();


// App Controller
const App = (function(ItemCtrl, UICtrl) {
    // Public Method
    return {
        init: function() {
            console.log('Initializing App...')
        }
    }
})(ItemCtrl, UICtrl);


// Initialize App
App.init();