import { expect, describe, test } from "vitest";
import { Appreciate, Depreciate, Stagnate, items, updateQualityAll } from "./gilded-rose.js";

describe("updateQuality", () => {
  test("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Depreciate("basic", 5, 3); // Type, Sellin, Quality
    console.log("This is in the test file", testItem.valueType);
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  test("reduces sellIn less than zero", () => {
    const testItem = new Depreciate("basic", -1, 5); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(3);
    expect(testItem.sellIn).toBe(-2);
  });

  test("Aged Brie increase in quality", () => {
    const testItem = new Appreciate("Aged Brie", 4, 6); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(7);
    expect(testItem.sellIn).toBe(3);
  });

  test("no items (Aged Brie) go past quality of 50", () => {
    const testItem = new Appreciate("Aged Brie", 3, 50); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(2);
  });  

  test("Sulfuras, Hand of Ragnaros never decreases in quality", () => {
    const testItem = new Stagnate("Sulfuras, Hand of Ragnaros", 4, 80); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(4); // Sellin date for legendary doesnt go down
  });

  test("Backstage passes to a TAFKAL80ETC concert, 9 days left before concert", () => {
    const testItem = new Appreciate("Backstage passes to a TAFKAL80ETC concert", 9, 20); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(22);
    expect(testItem.sellIn).toBe(8); 
  });

  test("Backstage passes to a TAFKAL80ETC concert, 4 days left before concert", () => {
    const testItem = new Appreciate("Backstage passes to a TAFKAL80ETC concert", 4, 20); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(23);
    expect(testItem.sellIn).toBe(3); 
  });

  test("Backstage passes to a TAFKAL80ETC concert, after concert", () => {
    const testItem = new Appreciate("Backstage passes to a TAFKAL80ETC concert", -1, 20); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-2); 
  });

  test("Conjured items degrade twice as fast", () => {
    const testItem = new Depreciate("Conjured Mana Cake", 3, 6); // Type, Sellin, Quality
    items.push(testItem);

    updateQualityAll();

    expect(testItem.quality).toBe(4);
    expect(testItem.sellIn).toBe(2); 
  });
});

// Not sure how to test "The quality of an item is never negative."
