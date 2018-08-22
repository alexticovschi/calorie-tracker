// Storage Controller


// Item Controller
const ItemCtrl = (function() {
    // Item Class
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
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

    // Public method
    return {
        getItems: function() {
            return data.items;
        },

        addItem: function(name, calories) {
            let ID;
            // Create ID 
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Parse Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },

        logData: function() {
            return data;
        }
    }
})();


// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }

    // Public method
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>
                    </li>
                `;

                // Insert list items
                document.querySelector(UISelectors.itemList).innerHTML = html;
            });
        },
        getSelectors: function() {
            return UISelectors;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        }
    }

})();


// App Controller
const App = (function(ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    }

    // Add item submit
    const itemAddSubmit = function(e) {
        e.preventDefault();

        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }

    }

    // Public method
    return {
        init: function() {
            console.log('Initializing App...');

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Populate list with items
            UICtrl.populateItemList(items);

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);


// Initialize App
App.init();