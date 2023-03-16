class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  updateQuality(){
    this.sellIn--;
  }
}

export class Depreciate extends Item{

  updateQuality(){
    super.updateQuality();
    if (this.quality > 0)
        this.quality--;
    if ((this.sellIn < 0 || this.name.includes("Conjured")) && this.quality > 0)
        this.quality--;
  }
}

export class Appreciate extends Item{

  updateQuality(){
    super.updateQuality();
    if (this.quality < 50) {
      this.quality = this.quality + 1;
      if (this.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (this.sellIn < 11 && this.quality < 50) 
            this.quality++;
        if (this.sellIn < 6 && this.quality < 50) 
            this.quality++;
        if (this.sellIn < 0) 
            this.quality = 0;
        }
      }  
  }
}
  
export class Stagnate extends Item{

  updateQuality(){
    // Do nothing
  }
}


export let items = [];

items.push(new Depreciate("+5 Dexterity Vest", 10, 20));
items.push(new Appreciate("Aged Brie", 2, 0));
items.push(new Depreciate("Elixir of the Mongoose", 5, 7));
items.push(new Stagnate("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new Appreciate("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new Depreciate("Conjured Mana Cake", 3, 6));

export const updateQualityAll = () => {
  for (let item of items) {
        item.updateQuality();
  };
}
