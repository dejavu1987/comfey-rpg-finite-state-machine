export default {
  start: "livingRoom",
  livingRoom: {
    openDrawer: "drawer",
    enterBath: "bath",
    exitApartment: "street"
  },
  drawer: {
    wearMask: {
      inventory: "+mask"
    },
    closeDrawer: "livingRoom"
  },
  bath: {
    takeAShower: {
      inventory: "+clean"
    },
    brushTeeth: {
      inventory: "+smile"
    },
    exitBath: "livingRoom"
  },
  street: {
    enterKiosk: "kiosk",
    enterMall: "mall",
    enterApartment: "livingRoom",
    enterSupermarket: "supermarket"
  },
  kiosk: {
    buyBeer: {
      inventory: "+beer",
      cash: -1
    },
    buyEnergyDrink: {
      inventory: "+energyDrink",
      cash: -1
    },
    buySnacks: {
      inventory: "+snacks",
      cash: -5
    },
    exitKiosk: "street"
  },
  mall: {
    buyShirt: {
      inventory: "+shirt",
      cash: -20
    },
    buyShoes: {
      inventory: "+shoes",
      cash: -60
    },
    buyJeans: {
      inventory: "+jeans",
      cash: -60
    },
    exitMall: "street"
  },
  supermarket: {
    buyFruits: {
      inventory: "+fruits",
      cash: -4
    },
    buyMeat: {
      inventory: "+meat",
      cash: -5
    },
    buyFrozenPizza: {
      inventory: "+frozenPizza",
      cash: -5
    },
    buyHammer: {
      inventory: "+hammer",
      cash: -10
    },
    exitSupermarket: "street"
  }
};
