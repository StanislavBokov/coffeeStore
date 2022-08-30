const coffeeItemMock = require('../mock/coffeeItem.json')
const CoffeeItem = require('../models/CoffeeItem')

module.exports = async () => {
    const cofeeItem = await CoffeeItem.find() // возвращает все записи в виде массива
    if(cofeeItem.length !== coffeeItemMock.length) {
       await createInitialEntity(CoffeeItem, coffeeItemMock)
    }
  }
  
  async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}