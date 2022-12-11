package com.example.videogamecatalog.controller;

import com.example.videogamecatalog.models.VideoGame;
import com.example.videogamecatalog.service.VideoGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/games")
public class Controller {

    @Autowired
    VideoGameService videoGameService;

    @GetMapping("/all")
    public List<VideoGame> getAllGames(){
        return videoGameService.getAllGames();
    }

    @GetMapping("/find/{id}")
    public VideoGame getGameById(@PathVariable Long id){
        return videoGameService.getGameById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Game with id %d not found", id)));
    }

    @PostMapping("/add")
    public ResponseEntity<VideoGame> addGame(@Valid @RequestBody VideoGame game, Errors errors){
        if (errors.hasErrors()) {
            return new ResponseEntity(errors.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        VideoGame newGame = videoGameService.addGame(game);
        return new ResponseEntity<>(newGame, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<VideoGame> updateGame(@Valid @RequestBody VideoGame game, Errors errors){
        if (errors.hasErrors()) {
            return new ResponseEntity(errors.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        VideoGame updatedGame = videoGameService.updateGame(game);
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteGame(@PathVariable Long id){
        try{
            videoGameService.deleteGame(id);
            return new ResponseEntity<>(String.format("Game with id %d was deleted.", id), HttpStatus.OK);
        }catch (EmptyResultDataAccessException e){
            return new ResponseEntity<>(String.format("Game with id %d was not in the database and not deleted", id), HttpStatus.BAD_REQUEST);
        }
    }
}
