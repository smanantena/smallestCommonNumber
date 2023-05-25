function smallestCommons(arr) {
    let result;
    if (arr.some(item => item == 0)) {
      return 0; //si zéro est detecté dans la séquence alors le PPCM est obligatoirement égale à 0
    } else {
      result = genSeq(arr); //génération de la séquence d'entier entre les deux valeurs données
      let unpackList = unpackNumList(result); //décomposition en facteur de nombre premier de chaque nombre de la séquence
      let uniqueList = createUniqueListArray(unpackList); //création de la liste des nombres premiers qui compose chaque nombre de la séquence
  
      result = numberPrimisArray(uniqueList, unpackList); //comptage de la quantité de chaque nombre premier de chaque décomposition
      result = compareListInArray(result); //élaboration de la liste des facteurs premiers les plus grandss
      result = objectToNum(result); //calcul de PPCM de la séquence
      return result; //restitution du resultat
    }
  }
  
  function genSeq(arr) { //étape 1 : génération de la séquence
    let arrtemp = arr.sort((a,b) => a-b);
    let result = [];
    for(let i = arrtemp[0]; i <= arrtemp[arrtemp.length - 1] ; i++) {
      result.push(i);
    }
    return result;
  }
  
  function unpackNumList(arr) { //décompostion en list de produit de facteur premier la liste des nombres données dans la séquence
    let result = [];
    arr.forEach(
      item => result.push(unpackSingleNum(item))
    );
    return result;
  }
  
  function unpackSingleNum(num) { //décomposition en produit de facteur premier d'un nombre donné
    let result = [];
    let d = num;
    let list = genPrimis(num);
  
    for(let i = 0 ; i < list.length ; i++) {
      if(d % list[i] === 0 && d / list[i] === Math.trunc(d/list[i])) {
        while(d/list[i] === Math.trunc(d/list[i])){
          
          result.push(list[i]);
          d /= list[i];
        }
        d = num;
      }
    }
    if(num == 1) {
      result.push(1);
    }
    return result;
  }
  
  
  function genPrimis(numStop) { //générateur de liste de nombre premier s'arrêtant à numStop, car la liste est infinie
    let tab = [];
    
    for(let i = 2 ; i <= numStop ; i++) {
  
      let counterDivisor = 0;
      for(let j = 2 ; j <= i ; j++) {
        if(i%j == 0) {
          ++counterDivisor;
        }
      }
      if(counterDivisor == 1) {
        tab.push(i);
      }
    }
    return tab;
  }
  
  function createUniqueListArray(arr) {  //création de liste de liste trié et unique de chaque liste de facteur premier d'une liste de décomposition donnée
    let result = [];
  
    arr.forEach(
      item => result.push(createUniqueSingleList(item))
    );
    return result;
  }
  
  function createUniqueSingleList(arr1) { //création de liste trié et unique de chaque facteur premier d'un seule décomposition données
    let listUnique = [];
    for(let i = 0 ; i < arr1.length ; i++){
      if(!listUnique.includes(arr1[i])) {
        listUnique.push(arr1[i]);
      }
    }
    return listUnique;
  }
  
  function numberPrimisArray(arrUniqueList, arrNumList) { //élaboration de liste d'une liste de liste de facteur premier avec leurs quantités
    let list = [];
  
    for(let i = 0 ; i < arrUniqueList.length ; i++) {
      list.push(numberPrimisSingle(arrUniqueList[i], arrNumList[i]));
    }
    return list;
  }
  
  function numberPrimisSingle(arrUnique, arrUnPack) { //élaboration de la liste des facteurs premiers et leurs quantités dans une décomposition donnée
    let list = {};
  
    arrUnique.forEach(
      function(item) {
        list[item] = arrUnPack.lastIndexOf(item) - arrUnPack.indexOf(item) +1;
      }
    );
    return list;
  }
  
  function compare2List(listA, listB) { //comparaison de deux listes de facteurs premiers afin d'élaborer la liste de facteur premier constituant le PPCM des nombres représentés par les deux listes.
    let result = {};
    for(const element in listA) { //première comparaison : comparaison de la listA à la listB
      if(Object.keys(listB).includes(element)) {
         result[element] = listA[element] > listB[element] ? listA[element]: listB[element];
      } else {
        result[element] = listA[element];
      }
    }
  
    for(const element in listB) { //deuxième comparaison : comparaison de la listB à la liste résultante de la première comparaison
      if(Object.keys(result).includes(element)) {
        result[element] = result[element] > listB[element] ? result[element] : listB[element];
      } else {
        result[element] = listB[element];
      }
    }
  
    return result;
  }
  
  function compareListInArray(arr) { //exploitation de la fonction d'élaboration de liste de facteur premier constituant le PPCM de deux nombres données, pour un tableau d'élément décomposé
    let result = {};
    result = compare2List(arr[0], arr[1]);
    
    for(let i = 1; i < arr.length ; i++) {
      result = compare2List(result, arr[i]);
    }
    
    return result;
  }
  
  function objectToNum(list) { //calcul du PPCM à partir de la liste de la décomposition des facteurs premiers préétablie
    let result = 1;
  
    for(const property in list) {
      result *= Math.pow(parseInt(property),list[property]);
    }
    return result;
  }
  
  //console.log(compareListInArray([ { '2': 2 }, { '5': 1 }, { '2': 1, '3': 1 } ]));
  //console.log(compare2List({ '9': 2, '2':10 }, { '2': 1, '3': 1 }));
  //console.log(numberPrimisArray([[2,3],[3]],[[2,2,2,3],[3,3,3]]));
  //console.log(objectToNum({ '2': 3, '3': 1, '7': 1 }));
  console.log(smallestCommons([6,8]));