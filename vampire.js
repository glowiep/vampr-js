class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberToOriginalVampire = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberToOriginalVampire++;
    }
    return numberToOriginalVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // Function to find the ancestry line of the vampire
    const listOfAncestors = function(vampireName) {
      let list = [];
      let currentVampire = vampireName;
      while (currentVampire) {
        list.push(currentVampire);
        currentVampire = currentVampire.creator;
      }
      return list;
    };
    // Helper function to find common ancestor
    const findCommonAncestor = function(vampireA, vampireB) {
      const ancestryA = listOfAncestors(vampireA).reverse();
      const ancestryB = listOfAncestors(vampireB).reverse();

      let commonAncestor = null;  // Return null if no common ancestor is found

      // Compare ancestry to find common ancestor
      for (let i = 0; i < Math.min(ancestryA.length, ancestryB.length); i++) {
        if (ancestryA[i] === ancestryB[i]) {
          commonAncestor = ancestryA[i];
        } else {
          break;
        }
      }
      return commonAncestor;
    };
    return findCommonAncestor(this, vampire);
  }

}

module.exports = Vampire;