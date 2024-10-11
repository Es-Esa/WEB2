# Express backend luominen

- Pullattu Githubista valmiin backendin

- git clone https://github.com/bezkoder/nodejs-express-sequelize-mysql

- git clone https://github.com/bezkoder/redux-toolkit-example-crud-hooks

Huom, kansiot on nimetty eritavalla.


## Express asennus

- npm intall

- tietokanna luonti.

- tietokkanna konfigurointi jotta toimii expressin kanssa:

```
module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "toor",
  DB: "tutorials",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```


## redux_react frontin asennus

- npm install


## backendin rakentaminen jotta se voi käsitellä kommentteja

- modelien ja controllerin luonti

- comments.model.js luonti jotta sequelize pystyy luomaan kommentikentät tietokantaan.
- tutorial.model.js muutos jotta suhde on "yhden suhde moneen"

```
 Tutorial.associate = function (models) {
    Tutorial.hasMany(models.Comment, { as: 'comments' });
  };
```

- index.js tehty muutoksia jotta se osaa ajaa sen scriptin sinne tietokantaan.


- comment.controller.js luonti.

> Tämän controllerin tehtävä on luoda ja hakea tietokannasta kommentit.
> Katso tarkemmin kommentit tiedostosta.



## Routes muokkaus


Lisätty reitit Api rajapintaan.

```
// Route for creating a comment
  router.post('/comments/:tutorialId', comments.create);

// Route for fetching all comments for a tutorial
  router.get('/comments/:tutorialId', comments.findAll);
```



## testaus

Tietokanta toimii ja palauttaa sinne manauaalisesti lisätyt kommentit.



---




# Front end Redux, react front

- Loin /service/commentservice.js

> Tämä sisältää axio kutsun joka käsittelee funktioita.
> Funktiot lisäävät kommentteja tai hakee kaikki kommentit tietokannasta.

- Loin /slice/comments.js

> Tämä sisältää createSlice ja  createAsyncThunk funktiot, createSlice luo uuden slice-olion, se sisältää reducerit ja action creators. Taas createAsyncThunk luo uuden thunkin, joka käsittelee asynkronisisa toimintoja.

- Päivitin /store/store.js

> Jossa lisäsin importin slices/comments ja päivitin reducer muuttujan 
> comments: commentsReducer



- Loin components/AddComments.js

> Tämä on komponentti joka lisää uuden komponentin.

- Tein muutosta Tutorial.js

Importasin `import { createComment, retrieveComments } from "../slices/comments"; `

Lisäsin uuden tila   `const [newComment, setNewComment] = useState(""); // tämä on uusi tila kommentille joka lisätään tutoriaaliin`

Käytetään dispatch funktiota Reduxin action creatorien kutsumiseenconst`dispatch = useDispatch();`

Haetaan kommentit statesta `const comments = useSelector(state => state.comments || []);` 

Käytetään hook joka hakee tutoriaalit ja kommentit kun sivu alkaa

```
  useEffect(() => {
    const getTutorial = id => {
      TutorialDataService.get(id)
        .then(response => {
          setCurrentTutorial(response.data);
          console.log(" ID tutoriaaliin:", id); // debugausta
          dispatch(retrieveComments(id)); // hakee kommentit tutoriaalille kun tutoriaali on haettu
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    if (id) {
      getTutorial(id);
    }
  }, [id, dispatch]);
```


Käsitellään kemmentien muutos input-ketässä ja päivitetään se newComment tilaan. 

```
const handleCommentChange = event => {
    setNewComment(event.target.value); 
  };
```


Määritetään kommenttien lisäsys funktio

```
const addComment = () => {
    if (newComment.trim()) { // tarvitaa onko kommentti tyhjä, jos ei niin lisätään kommentti
      dispatch(createComment({ tutorialId: currentTutorial.id, text: newComment }))
        .unwrap()
        .then(() => {
          setNewComment(""); // tyhjentää input-kentän
          setMessage("Comment added successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
```


  Lisätään tarvittavat html tagit

```
  <h4>Comments</h4>
          <ul>
            {comments.length > 0 ? (
              comments.map(comment => (
                <li key={comment.id}>{comment.text}</li>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </ul>

          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button onClick={addComment} className="badge badge-success">
            Add Comment
          </button>
```


## Debugaus

Jostain syystä Apista tuleva data toimi, mutta sliceri ei ottanut dataa muuttujiin.
Ongelma oli retriceCommentssa, korjasin kun tein async funktion samalalla tavalla kuin tutorial.js
Siksi löytyy paljon debugausta.


### Puppetter

Luovutin tämän suhteen, en saanut toimimaan. Virheitä virheiden perään. 
```
 FAIL  src/tests/addComment.test.js
  ● Test suite failed to run

    Cannot find module 'puppeteer-core/internal/puppeteer-core.js' from 'node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js'

    Require stack:
      node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js
      src/tests/addComment.test.js

      at Resolver.resolveModule (node_modules/jest-resolve/build/resolver.js:324:11)
      at Object.<anonymous> (node_modules/puppeteer/src/puppeteer.ts:9:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.725 s
```

ei löydä tätä moduulia, vaikka yrittäisin asentaa globaalisti, tai poistin koko node_moduulit ja asensin uudestaan. Mikään ei auttanut..

https://hackmd.io/@web2/rk1xDYLk1x
