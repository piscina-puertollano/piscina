const { response, request } = require("express");
const newsConnection = require("../../database/news/newsConnection");

const conx = new newsConnection();

/**
 * @author: badr
 */

const index = async (req, res) => {
  try {

    let resNew = await conx.getAll();

    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Ha ocurrido un error" });
  }
};

const show = async (req, res) => {
  try {
    let resNew = await conx.getById(req.params.id);
    await conx.updateView(req.params.id);
    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const setCounts = async (req, res) => {
  try {
    let resNew = 0
    switch(req.body.type){
      case 'like':
        resNew = await conx.incrementLike(req.body.id);
        break;
      case 'dislike':
        resNew = await conx.incrementDislike(req.body.id);
        break;
      case 'share':
        resNew = await conx.incrementShare(req.body.id);
        break;
    }

    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }

  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const createNew = async (req, res) => {
  req.body.id_user = req.userId;
  let countWords = countWordNew(req.body.body);
  req.body.duration = durationNew(countWords);
  req.body.summary = realyzeSumary(req.body.body);
  console.log(req.body);
  await conx
    .createNew(req.body)
    .then((resNew) => {
      res.status(200).json(resNew);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ msg: "No se ha podido crear la noticia", error: err });
    });
};

const countWordNew = (body_new) => {
  let word = body_new.split(" ");
  word = word.filter(
    (word) =>
      word != process.env.CONJUNCIONES || process.env.ARTICULOS_PREPOSICIONES
  );

  return word.length;
};

const durationNew = (count_words) => {
  return count_words * process.env.SPEED_REED_ONE_WORD;
};

const realyzeSumary = (body_new) => {
  let words = body_new.split(" ");
  let filteredWords = [];
  let rtnWords = [];

  let j = 0;
  while (j < words.length) {
    if (
      !process.env.CONJUNCIONES.includes(words[j]) &&
      !process.env.ARTICULOS_PREPOSICIONES.includes(words[j])
    ) {
      filteredWords.push(words[j]);
    }
    j++;
  }

  let i = 0;
  let words_sumary = Math.floor(
    (filteredWords.length * process.env.DEGREE_SUMARY) / 100
  );
  while (i < words_sumary) {
    let randNum = Math.floor(Math.random() * filteredWords.length);
    rtnWords.push(filteredWords[randNum]);
    words.splice(i, 1);
    i++;
  }
  return rtnWords.toString();
};

const updateNew = async (req, res) => {
  await conx
    .updateNew(req.params.id, req.body)
    .then((msg) => {
      console.log(msg);
      res.status(200).json(msg);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ msg: "No se ha podido actualizar la noticia", error: err });
    });
};

const destroyNew = async (req, res) => {
  try {
    console.log(req.params.id);
    let resNew = await conx.deleteNewById(req.params.id);
    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se ha podido eliminar la noticia" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

/**                                                                   **
 * -------------------------- Algoritmo ----------------------------- **
 *                                                                     */

/**
 * Recomendador para redactar una noticia.
 * En base a todas las noticias que se han ido agregando,
 * se obtienen un top de 10 resumenes de las noticias, con más visitas.
 * Y se devuelve todas las palabras
 */
const getAllSummaries = async (req, res) => {
  try {
    let resSummaries = await conx.getAllSummaries();
    if (resSummaries != 0) {
      // Paso 1: Extraer y procesar todos los resumenes
      let allSummaries = "";
      for (let i = 0; i < resSummaries.length; i++) {
        if (resSummaries[i].summary) {
          allSummaries += resSummaries[i].summary + ",";
        }
      }

      // Paso 2: Contar el número de veces que aparece la palabra
      let wordCounts = {};
      let words = allSummaries.split(",");
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word) {
          if (wordCounts[word]) {
            wordCounts[word]++;
          } else {
            wordCounts[word] = 1;
          }
        }
      }

      // Paso 3: Ordenar las palabras por frecuencia
      let sortedWords = [];
      for (let word in wordCounts) {
        sortedWords.push([word, wordCounts[word]]);
      }
      sortedWords.sort(function (a, b) {
        return b[1] - a[1];
      });

      // Paso 4: Seleccionar las 10 palabras más repetidas
      let topWords = [];
      for (let i = 0; i < 10 && i < sortedWords.length; i++) {
        topWords.push(sortedWords[i][0]);
      }

      console.log(topWords);

      res.status(200).json(topWords);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

/**
 * Para potenciar la visita de todas las noticias,
 * se mostrará una noticia aleatoria, para ello se obtiene un array
 * de 10 noticias ordenadas por menor visitas, cuando se devuelve la noticia
 * se suma +1 en la visita
 *
 */

const randNew = async (req, res) => {
  try {
    let resNew = await conx.getNewsWithLowerVisits();

    let randNum = Math.floor(Math.random() * resNew.length);

    if (resNew != 0) {
      console.log(resNew[randNum].id);
      await conx.updateView(resNew[randNum].id);
      res.status(200).json(resNew[randNum]);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const latestNews = async (req, res) => {
  try {
    let resNew = await conx.getLatestNews();
    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const popularNews = async (req, res) => {
  try {
    let resNew = await conx.getLastPopular();
    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


/**
 * Con la siguiente función lo que se quiere conseguir es un feed de noticias personalizado.
 * A la función se le pasa tipos de categorías y se devuelven las noticias ordenadas por
 * las categorías que más visita.
 *
 * Ejemplo, usuario 1, le gustan las noticias de salud y tecnología, prioritariamente se le ordenarán
 * las noticias por salud y tecnología más luego todas lás demaś.
 *
 * Esta función espera un array de categorías, y como mínimo se espera que el usuario vea MIN_SHOW_NEWS noticias para
 * determinar el gusto del usuario.
 *
 */

const afindFeed = async (req, res) => {
  try {
    let categories = req.body.categories;
    let searchCategories = [];
    let rtnFeed = [];

    //Paso 1 eliminar las categorías repetidas
    categories.forEach((element) => {
      if (!searchCategories.includes(element.category)) {
        searchCategories.push(element.category);
      }
    });

    //Paso 2 obtener las noticias de las categorías
    let i = 0;
    let degreeSumary = Math.floor(
      (categories.length * process.env.DEGREE_SUMARY) / 100
    );
    while (i < degreeSumary) {
      let randCat = Math.floor(Math.random() * searchCategories.length);
      rtnFeed.push(await conx.getNewByCategory(searchCategories[randCat]));
      i++;
    }

    //Paso 3 aplanar el array de noticias para que esté en un solo array
    if (rtnFeed != 0) {
      function aplanarArray(array) {
        let resultado = [];
        for (let subArray of array) {
          for (let obj of subArray) {
            resultado.push(obj);
          }
        }
        return resultado;
      }

      let parseFeed = aplanarArray(rtnFeed)
      let allNews = await conx.getAll();

      let parseFeedIds = [];
      for (let news of parseFeed) {
        parseFeedIds.push(news.id);
      }

      //Paso 4 Quitamos de allNews las noticias que ya tenemos en parseFeed
      let filteredAllNews = [];
      for (let news of allNews) {
        if (!parseFeedIds.includes(news.id)) {
          filteredAllNews.push(news);
        }
      }

      //Pase 5 Juntamos ambos arrays
      let combinedFeed = parseFeed.concat(allNews);

      /**
       * Se que se da mucha vuelta para lo que se quiere conseguir, realmente, si tuviera una tabla
       * categorías, con una select con IN y NOT IN, y order, más los cruces, se hubiera llegado al mismo
       * punto, en este caso como no me da tiempo a agregar la tabla categorias para las noticias, 
       * hay que ir jugando con los arrays, se que no es lo más correcto, toda esta carga de trabajo 
       * no debe de recaer en el controlador.
       */

      res.status(200).json(combinedFeed);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};


const fastReed = async (req, res) => {
  try {
    let resNew = await conx.getNewShortReed();
    if (resNew != 0) {
      res.status(200).json(resNew);
    } else {
      res.status(400).json({ msg: "No se han encontrado noticias" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  index,
  show,
  createNew,
  destroyNew,
  updateNew,
  latestNews,
  popularNews,
  getAllSummaries,
  randNew,
  afindFeed,
  setCounts,
  realyzeSumary,
  fastReed
};
