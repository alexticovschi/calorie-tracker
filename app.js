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
            // {id: 0, name: 'Steak Dinner', calories: 600},
            // {id: 1, name: 'Oats', calories: 400},
            // {id: 2, name: 'Cake', calories: 1400}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
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
        getItemById: function(id) {
            let found = null;
            // Loop through items
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem : function() {
            return data.currentItem;
        },
        getTotalCalories: function() {
            let total = 0;

            // Loop through items and add calories
            data.items.forEach(function(item) {
                total += item.calories;
            });
            console.log('total calories:', total);

            // Set total calories in data structure
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
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
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',        
        deleteBtn: '.delete-btn',        
        backBtn: '.back-btn'        
    }

    // Public methods
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
        addListItem: function(item) {
            //Show the lis 
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        getSelectors: function() {
            return UISelectors;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name,
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
            UICtrl.showEditState();
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '',
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
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

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    }

    // Click edit item
    const itemEditClick = function(e) {
        e.preventDefault();

        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Clear input
            UICtrl.clearInput();
        }

    }

    // Update item submit
    const itemUpdateSubmit = function(e) {
        e.preventDefault();

        if(e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;
            
            // Break into an array
            const listIdArr = listId.split('-');

            // Get the actual id
            const id = parseInt(listIdArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
    }


    // Public method
    return {
        init: function() {
            console.log('Initializing App...');

            // Clear edit state / Set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Check if any items
            if(items.length === 0) {
                // Hide list
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);


// Initialize App
App.init();