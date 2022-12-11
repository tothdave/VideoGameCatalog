package com.example.videogamecatalog.service;

import com.example.videogamecatalog.models.VideoGame;
import com.example.videogamecatalog.repository.VideoGameRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@Service
public class VideoGameService {

    @Autowired
    VideoGameRepo videoGameRepo;

    public List<VideoGame> getAllGames() {
        return videoGameRepo.findAll();
    }

    public Optional<VideoGame> getGameById(Long id){
        return videoGameRepo.findById(id);
    }

    public VideoGame addGame(VideoGame game){
        return videoGameRepo.save(game);
    }

    public VideoGame updateGame(VideoGame game){
        return videoGameRepo.save(game);
    }

    public void deleteGame(Long id){
        videoGameRepo.deleteById(id);
    }
}
