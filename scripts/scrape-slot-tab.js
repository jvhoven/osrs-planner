/*
* Navigate to, for example https://oldschool.runescape.wiki/w/Two-handed_slot_table, it can be any of the slot tables,
* and paste this script into the console. It'll then return a list of all items along with their image and respective stats
*/
(function() {
  const poisonRegex = /#\(p?\+*\)|#(Poison?\+*|Unpoisoned)/g
  const flammableRegex = /#(Lit|Unlit)/g

  const cellIndicators = {
    0: "image",
    1: "name",
    2: "membership",
    3: "attack-stab",
    4: "attack-slash",
    5: "attack-crush",
    6: "attack-magic",
    7: "attack-ranged",
    8: "defence-stab",
    9: "defence-slash",
    10: "defence-crush",
    11: "defence-magic",
    12: "defence-ranged",
    13: "other-strength",
    14: "other-rangedStrength",
    15: "other-magicDamagePercentage",
    16: "other-prayer",
    17: "weight",
    18: "attackSpeed"
  }

  const table = document.getElementsByTagName("table")[1];
  const [, ...rows] = [...table.querySelectorAll("tr")]
  const data = [];

  const isPoisonable = (name) => name.match(poisonRegex) !== null;
  const isFlammable = (name) => name.match(flammableRegex) !== null;

  rows.map((row, rowIndex) => {
    const cells = [...row.querySelectorAll("td")]
    data.push({
      image: "",
      slot: "ammunition",
      name: "",
      weight: 0,
      attackSpeed: undefined,
      members: false,
      poisonable: false,
      flammable: false,
      bonuses: {
        attack: {
          stab: 0,
          slash: 0,
          crush: 0,
          magic: 0,
          ranged: 0
        },
        defence: {
          stab: 0,
          slash: 0,
          crush: 0,
          magic: 0,
          ranged: 0
        },
        other: {
          strength: 0,
          rangedStrength: 0,
          magicDamagePercentage: 0,
          prayer: 0
        }
      },
    });

    cells.map((cell, cellIndex) => {
      const cellIndicator = cellIndicators[cellIndex];

      switch (cellIndicator) {
        case "image":
          Object.assign(data[rowIndex], {
            image: cell.querySelector("img").src
          });
          break;
        case "name": {
          const name = cell.querySelector("a").innerHTML;
          Object.assign(data[rowIndex], {
            name,
            poisonable: isPoisonable(name),
            flammable: isFlammable(name)
          });
          break;
        }
        case "membership":
          Object.assign(data[rowIndex], {
            members: cell.querySelector("img").alt === "Members"
          });
          break;
        case "weight":
          Object.assign(data[rowIndex], {
            weight: cell.innerHTML
          });
          break;
        case "attackSpeed":
          if (cell) {
            Object.assign(data[rowIndex], {
              attackSpeed: cell.innerHTML
            });
          }
          break;
        default:
          if (cellIndicator === undefined) break;
          const [category, property] = cellIndicator.split("-");
          Object.assign(data[rowIndex], {
            bonuses: {
              ...data[rowIndex].bonuses,
              [`${category}`]: {
                ...data[rowIndex].bonuses[`${category}`],
                [`${property}`]: cell.innerHTML.replace(/\%|\+/g, '')
              }
            }
          })
          break;
      }
    })
  })
})();
