import express from "express";
import { createSong, deleteSong, getSong, getSongs, updateSong } from "../controllers/songController.js";
import requireAuth from "../middleware/requireAuth.js";



const router = express.Router();




//get all songs
router.get('/', getSongs);


//get a single song
router.get('/:id', getSong)


//require auth for post, delete and update routes
router.use(requireAuth);

//create a new song
router.post('/', createSong)


//delete a song
router.delete('/:id', deleteSong)

//update a song
router.patch('/:id', updateSong)


//export default route
export default router;

