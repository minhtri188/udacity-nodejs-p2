import express from 'express';
import bodyParser from 'body-parser';
import {Request, Response} from 'express';
import {filterImageFromURL, deleteLocalFiles, getFilesFromPath} from './util/util';
import { validateToken } from './util/authRequest';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async (req: Request, res: Response) => {
    const validate: boolean = await validateToken(req) as boolean;
    if (!validate) {
      return res.status(401).send('Access Denied')
    }
    const imgUrl: string = req.query.image_url.toString();
    if (imgUrl) {
      // get all files in the path '/tmp' before we will store new image
      return getFilesFromPath().then((files: Array<string>) => {
        return filterImageFromURL(imgUrl).then((data) => {
          res.status(200).sendFile(data);

          if (files && files.length > 0) {
            //delete all files in '/tmp' except the new image
            deleteLocalFiles(files);
          }
          return;
        }).catch((err) => {
          console.log(err);
          return res.status(400).send("try the other img_url, we can't get your link.")
        });
      });
    } else {
      return res.status(400).send("try the other img_url, we can't get your link.")
    }
    // }).catch((error) => {
    //   console.log(error);
    //   return res.status(400).send(error)
    // })
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
